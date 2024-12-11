import { CheerioAPI, load } from 'cheerio';
import { fetchApi, fetchFile } from '@libs/fetch';
import { Plugin } from '@typings/plugin';
import { NovelStatus } from '@libs/novelStatus';
import { defaultCover } from '@libs/defaultCover';
import { Filters } from '@libs/filterInputs';

interface LightNovelWPOptions {
  reverseChapters?: boolean;
  lang?: string;
  versionIncrements?: number;
  seriesPath?: string;
  customJs?: string;
}

export interface LightNovelWPMetadata {
  id: string;
  sourceSite: string;
  sourceName: string;
  options?: LightNovelWPOptions;
  filters?: any;
}

class LightNovelWPPlugin implements Plugin.PluginBase {
  id: string;
  name: string;
  icon: string;
  site: string;
  version: string;
  options?: LightNovelWPOptions;
  filters?: Filters;

  constructor(metadata: LightNovelWPMetadata) {
    this.id = metadata.id;
    this.name = metadata.sourceName;
    this.icon = `multisrc/lightnovelwp/${metadata.id.toLowerCase()}/icon.png`;
    this.site = metadata.sourceSite;
    const versionIncrements = metadata.options?.versionIncrements || 0;
    this.version = `1.0.${4 + versionIncrements}`;
    this.options = metadata.options ?? ({} as LightNovelWPOptions);
    this.filters = metadata.filters satisfies Filters;
  }

  getHostname(url: string): string {
    url = url.split('/')[2];
    let url_parts = url.split('.');
    url_parts.pop(); // remove TLD
    return url_parts.join('.');
  }

  async getCheerio(url: string, search: boolean): Promise<CheerioAPI> {
    const r = await fetchApi(url);
    if (!r.ok && search != true)
      throw new Error(
        'Could not reach site (' + r.status + ') try to open in webview.',
      );
    const $ = load(await r.text());
    const title = $('title').text().trim();
    if (
      this.getHostname(url) != this.getHostname(r.url) ||
      title == 'Bot Verification' ||
      title == 'You are being redirected...' ||
      title == 'Un instant...' ||
      title == 'Just a moment...' ||
      title == 'Redirecting...'
    )
      throw new Error('Captcha error, please open in webview');

    return $;
  }

  parseNovels($: CheerioAPI): Plugin.NovelItem[] {
    const novels: Plugin.NovelItem[] = [];

    $('div.listupd > article').each((i, elem) => {
      const novelName = $(elem).find('h2').text();
      const image = $(elem).find('img');
      const novelUrl = $(elem).find('a').attr('href');

      if (novelUrl) {
        novels.push({
          name: novelName,
          cover: image.attr('data-src') || image.attr('src') || defaultCover,
          path: novelUrl.replace(this.site, ''),
        });
      }
    });
    return novels;
  }

  async popularNovels(
    pageNo: number,
    {
      filters,
      showLatestNovels,
    }: Plugin.PopularNovelsOptions<typeof this.filters>,
  ): Promise<Plugin.NovelItem[]> {
    const seriesPath = this.options?.seriesPath ?? '/series/';
    let url = this.site + seriesPath + '?page=' + pageNo;
    if (!filters) filters = {};
    if (showLatestNovels) url += '&order=latest';
    for (const key in filters) {
      if (typeof filters[key].value === 'object')
        for (const value of filters[key].value as string[])
          url += `&${key}=${value}`;
      else if (filters[key].value) url += `&${key}=${filters[key].value}`;
    }
    const $ = await this.getCheerio(url, false);
    return this.parseNovels($);
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const $ = await this.getCheerio(this.site + novelPath, false);

    const novel: Plugin.SourceNovel = {
      path: novelPath.replace(this.site, ''),
      name: 'Untitled',
    };

    novel.name = $('h1.entry-title').text().trim();
    const image = $('img.wp-post-image');
    novel.cover = image.attr('data-src') || image.attr('src') || defaultCover;
    switch ($('div.sertostat > span').attr('class')?.toLowerCase() || '') {
      case 'completed':
        novel.status = NovelStatus.Completed;
        break;
      case 'ongoing':
        novel.status = NovelStatus.Ongoing;
        break;
      case 'hiatus':
        novel.status = NovelStatus.OnHiatus;
        break;
      default:
        novel.status = NovelStatus.Unknown;
        break;
    }

    let details = $('div.serl');
    if (!details.length) details = $('div.spe > span');
    details.each(function () {
      const detailName = $(this)
        .contents()
        .first()
        .text()
        .replace(':', '')
        .trim()
        .toLowerCase();
      const detail = $(this).contents().last().text().trim().toLowerCase();

      switch (detailName) {
        case 'الكاتب':
        case 'author':
        case 'auteur':
        case 'autor':
        case 'yazar':
          novel.author = detail;
          break;
        case 'الحالة':
        case 'status':
        case 'statut':
        case 'estado':
        case 'durum':
          switch (detail) {
            case 'مكتملة':
            case 'completed':
            case 'complété':
            case 'completo':
            case 'completado':
            case 'tamamlandı':
              novel.status = NovelStatus.Completed;
              break;
            case 'مستمرة':
            case 'ongoing':
            case 'en cours':
            case 'em andamento':
            case 'en progreso':
            case 'devam ediyor':
              novel.status = NovelStatus.Ongoing;
              break;
            case 'متوقفة':
            case 'hiatus':
            case 'en pause':
            case 'hiato':
            case 'pausa':
            case 'pausado':
            case 'duraklatıldı':
              novel.status = NovelStatus.OnHiatus;
              break;
            default:
              novel.status = NovelStatus.Unknown;
              break;
          }
          break;
        case 'الفنان':
        case 'artist':
        case 'artiste':
        case 'artista':
        case 'çizer':
          novel.artist = detail;
          break;
      }
    });

    let genres = $('.sertogenre');
    if (!genres.length) genres = $('.genxed');
    novel.genres = genres
      .children('a')
      .map((i, el) => $(el).text())
      .toArray()
      .join(',');

    let summary = $('.sersys > p')
      .map((i, el) => $(el).text().trim())
      .toArray();
    if (!summary.length)
      summary = $('.entry-content > p')
        .map((i, el) => $(el).text().trim())
        .toArray();
    novel.summary = summary.join('\n');

    const chapters: Plugin.ChapterItem[] = [];
    $('.eplister li').each((i, elem) => {
      const chapterName =
        $(elem).find('.epl-num').text() +
        ' ' +
        $(elem).find('.epl-title').text();
      const chapterUrl = $(elem).find('a').attr('href') || '';
      const releaseTime = $(elem).find('.epl-date').text().trim();
      let isFreeChapter: boolean;
      switch ($(elem).find('.epl-price').text().trim().toLowerCase()) {
        case 'free':
        case 'gratuit':
        case 'مجاني':
        case 'livre':
        case '':
          isFreeChapter = true;
          break;
        default:
          isFreeChapter = false;
          break;
      }
      if (isFreeChapter)
        chapters.push({
          name: chapterName,
          path: chapterUrl.replace(this.site, ''),
          releaseTime: releaseTime,
        });
    });

    if (this.options?.reverseChapters && chapters.length) chapters.reverse();

    novel.chapters = chapters;
    return novel;
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const $ = await this.getCheerio(this.site + chapterPath, false);
    try {
    } catch (error) {
      console.error('Error executing customJs:', error);
      throw error;
    }
    return (
      $('.epcontent p')
        .map((i, el) => $(el))
        .toArray()
        .join('\n') || ''
    );
  }

  async searchNovels(
    searchTerm: string,
    page: number,
  ): Promise<Plugin.NovelItem[]> {
    const url = this.site + 'page/' + page + '/?s=' + searchTerm;
    const $ = await this.getCheerio(url, true);
    return this.parseNovels($);
  }

  fetchImage = fetchFile;
}

const plugin = new LightNovelWPPlugin({
  'id': 'universalnovel',
  'sourceSite': 'https://universalnovel.com/',
  'sourceName': 'Universal Novel',
  'options': { 'lang': 'English', 'reverseChapters': false },
  'filters': {
    'genre[]': {
      'type': 'Checkbox',
      'label': 'Genre',
      'value': [],
      'options': [
        { 'label': 'Acting', 'value': 'acting' },
        { 'label': 'Action', 'value': 'action' },
        { 'label': 'Adult', 'value': 'adult' },
        { 'label': 'Adventure', 'value': 'adventure' },
        { 'label': 'Bl', 'value': 'bl' },
        { 'label': 'Comedy', 'value': 'comedy' },
        { 'label': 'Drama', 'value': 'drama' },
        { 'label': 'entertainment', 'value': 'entertainment' },
        { 'label': 'Fantasy', 'value': 'fantasy' },
        { 'label': 'Gender Bender', 'value': 'gender-bender' },
        { 'label': 'Ghost', 'value': 'ghost' },
        { 'label': 'Harem', 'value': 'harem' },
        { 'label': 'Historical', 'value': 'historical' },
        { 'label': 'Horror', 'value': 'horror' },
        { 'label': 'Isekai', 'value': 'isekai' },
        { 'label': 'Josei', 'value': 'josei' },
        { 'label': 'Male protagonist', 'value': 'male-protagonist' },
        { 'label': 'Martial Arts', 'value': 'martial-arts' },
        { 'label': 'Mature', 'value': 'mature' },
        { 'label': 'Mystery', 'value': 'mystery' },
        { 'label': 'Psychological', 'value': 'psychological' },
        { 'label': 'Reincarnation', 'value': 'reincarnation' },
        { 'label': 'Romance', 'value': 'romance' },
        { 'label': 'School Life', 'value': 'school-life' },
        { 'label': 'Sci-Fi', 'value': 'sci-fi' },
        { 'label': 'Shoujo', 'value': 'shoujo' },
        { 'label': 'Shounen', 'value': 'shounen' },
        { 'label': 'Shounen Ai', 'value': 'shounen-ai' },
        { 'label': 'Slice of Life', 'value': 'slice-of-life' },
        { 'label': 'Smut', 'value': 'smut' },
        { 'label': 'Sprited animal', 'value': 'sprited-animal' },
        { 'label': 'Supernatural', 'value': 'supernatural' },
        { 'label': 'Survival', 'value': 'survival' },
        { 'label': 'Transmigration', 'value': 'transmigration' },
        { 'label': 'Unlimited flow', 'value': 'unlimited-flow' },
        { 'label': 'Wuxia', 'value': 'wuxia' },
        { 'label': 'Xianxia', 'value': 'xianxia' },
        { 'label': 'Yaoi', 'value': 'yaoi' },
        { 'label': 'Yuri', 'value': 'yuri' },
      ],
    },
    'type[]': {
      'type': 'Checkbox',
      'label': 'Type',
      'value': [],
      'options': [
        { 'label': 'Chinese', 'value': 'chinese' },
        { 'label': 'Chinese Novel', 'value': 'chinese-novel' },
        { 'label': 'Korean Novel', 'value': 'korean-novel' },
        { 'label': 'Published Novel (KR)', 'value': 'published-novel-kr' },
        { 'label': 'Web Novel', 'value': 'web-novel' },
      ],
    },
    'status': {
      'type': 'Picker',
      'label': 'Status',
      'value': '',
      'options': [
        { 'label': 'All', 'value': '' },
        { 'label': 'Ongoing', 'value': 'ongoing' },
        { 'label': 'Hiatus', 'value': 'hiatus' },
        { 'label': 'Completed', 'value': 'completed' },
      ],
    },
    'order': {
      'type': 'Picker',
      'label': 'Order by',
      'value': '',
      'options': [
        { 'label': 'Default', 'value': '' },
        { 'label': 'A-Z', 'value': 'title' },
        { 'label': 'Z-A', 'value': 'titlereverse' },
        { 'label': 'Latest Update', 'value': 'update' },
        { 'label': 'Latest Added', 'value': 'latest' },
        { 'label': 'Popular', 'value': 'popular' },
      ],
    },
  },
});
export default plugin;
