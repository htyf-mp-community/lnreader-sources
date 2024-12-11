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
  'id': 'noblemtl',
  'sourceSite': 'https://noblemtl.com/',
  'sourceName': 'NobleMTL',
  'options': { 'lang': 'English', 'reverseChapters': true },
  'filters': {
    'genre[]': {
      'type': 'Checkbox',
      'label': 'Genre',
      'value': [],
      'options': [
        { 'label': 'A.I', 'value': 'a-i' },
        { 'label': 'Academy', 'value': 'academy' },
        { 'label': 'Action', 'value': 'action' },
        { 'label': 'Adult', 'value': 'adult' },
        { 'label': 'Adventure', 'value': 'adventure' },
        { 'label': 'Alternative History', 'value': 'alternative-history' },
        { 'label': 'Another World', 'value': 'another-world' },
        { 'label': 'Apocalypse', 'value': 'apocalypse' },
        { 'label': 'Bromance', 'value': 'bromance' },
        { 'label': 'Comedy', 'value': 'comedy' },
        { 'label': 'Cthulhu', 'value': 'cthulhu' },
        { 'label': 'Dark fantasy', 'value': 'dark-fantasy' },
        { 'label': 'Demons', 'value': 'demons' },
        { 'label': 'Drama', 'value': 'drama' },
        { 'label': 'Dystopia', 'value': 'dystopia' },
        { 'label': 'Ecchi', 'value': 'ecchi' },
        { 'label': 'Entertainment', 'value': 'entertainment' },
        { 'label': 'Exhaustion', 'value': 'exhaustion' },
        { 'label': 'Fanfiction', 'value': 'fanfiction' },
        { 'label': 'fantasy', 'value': 'fantasy' },
        { 'label': 'finance', 'value': 'finance' },
        { 'label': 'For men', 'value': 'for-men' },
        { 'label': 'Full color', 'value': 'full-color' },
        { 'label': 'fusion', 'value': 'fusion' },
        { 'label': 'gacha', 'value': 'gacha' },
        { 'label': 'Gallery', 'value': 'gallery' },
        { 'label': 'Game', 'value': 'game' },
        { 'label': 'Gender Bender', 'value': 'gender-bender' },
        { 'label': 'Genius', 'value': 'genius' },
        { 'label': 'Harem', 'value': 'harem' },
        { 'label': 'Healing', 'value': 'healing' },
        { 'label': 'Hero', 'value': 'hero' },
        { 'label': 'Historical', 'value': 'historical' },
        { 'label': 'Hunter', 'value': 'hunter' },
        { 'label': 'korean novel', 'value': 'korean-novel' },
        { 'label': 'Light Novel', 'value': 'light-novel' },
        {
          'label': 'List Adventure Manga Genres',
          'value': 'list-adventure-manga-genres',
        },
        { 'label': 'Long Strip', 'value': 'long-strip' },
        { 'label': 'Love comedy', 'value': 'love-comedy' },
        { 'label': 'magic', 'value': 'magic' },
        { 'label': 'Manhua', 'value': 'manhua' },
        { 'label': 'Martial Arts', 'value': 'martial-arts' },
        { 'label': 'Mature', 'value': 'mature' },
        { 'label': 'Medieval', 'value': 'medieval' },
        { 'label': 'Middle Ages', 'value': 'middle-ages' },
        { 'label': 'Misunderstanding', 'value': 'misunderstanding' },
        { 'label': 'Modern', 'value': 'modern' },
        { 'label': 'modern fantasy', 'value': 'modern-fantasy' },
        { 'label': 'Munchkin', 'value': 'munchkin' },
        { 'label': 'music', 'value': 'music' },
        { 'label': 'Mystery', 'value': 'mystery' },
        { 'label': 'Necromancy', 'value': 'necromancy' },
        { 'label': 'No Romance', 'value': 'no-romance' },
        { 'label': 'NTL', 'value': 'ntl' },
        { 'label': 'o', 'value': 'o' },
        { 'label': 'Obsession', 'value': 'obsession' },
        { 'label': 'Politics', 'value': 'politics' },
        { 'label': 'Possession', 'value': 'possession' },
        { 'label': 'Programming', 'value': 'programming' },
        { 'label': 'Psychological', 'value': 'psychological' },
        { 'label': 'Pure Love', 'value': 'pure-love' },
        { 'label': 'reasoning', 'value': 'reasoning' },
        { 'label': 'Redemption', 'value': 'redemption' },
        { 'label': 'Regression', 'value': 'regression' },
        { 'label': 'Regret', 'value': 'regret' },
        { 'label': 'Reincarnation', 'value': 'reincarnation' },
        { 'label': 'Return', 'value': 'return' },
        { 'label': 'Revenge', 'value': 'revenge' },
        { 'label': 'Reversal', 'value': 'reversal' },
        { 'label': 'Romance', 'value': 'romance' },
        { 'label': 'Romance Fanrasy', 'value': 'romance-fanrasy' },
        { 'label': 'Salvation', 'value': 'salvation' },
        { 'label': 'School Life', 'value': 'school-life' },
        { 'label': 'Sci-fi', 'value': 'sci-fi' },
        { 'label': 'Science fiction', 'value': 'science-fiction' },
        { 'label': 'Seinen', 'value': 'seinen' },
        { 'label': 'Shounen', 'value': 'shounen' },
        { 'label': 'Slice of Life', 'value': 'slice-of-life' },
        { 'label': 'Soft yandere', 'value': 'soft-yandere' },
        { 'label': 'Space opera', 'value': 'space-opera' },
        { 'label': 'Sports', 'value': 'sports' },
        { 'label': 'Supernatural', 'value': 'supernatural' },
        { 'label': 'Survival', 'value': 'survival' },
        { 'label': 'system', 'value': 'system' },
        { 'label': 'Time limit', 'value': 'time-limit' },
        { 'label': 'Tragedy', 'value': 'tragedy' },
        { 'label': 'Transmigration', 'value': 'transmigration' },
        { 'label': 'TRPG', 'value': 'trpg' },
        { 'label': 'TS', 'value': 'ts' },
        { 'label': 'Tsundere', 'value': 'tsundere' },
        { 'label': 'Unique', 'value': 'unique' },
        { 'label': 'Urban', 'value': 'urban' },
        { 'label': 'Villain', 'value': 'villain' },
        { 'label': 'Wholesome', 'value': 'wholesome' },
        { 'label': 'Wisdom', 'value': 'wisdom' },
        { 'label': 'Wuxia', 'value': 'wuxia' },
        { 'label': 'Xuanhuan', 'value': 'xuanhuan' },
        { 'label': 'Yandere', 'value': 'yandere' },
        { 'label': 'Yuri', 'value': 'yuri' },
      ],
    },
    'type[]': {
      'type': 'Checkbox',
      'label': 'Type',
      'value': [],
      'options': [
        { 'label': 'Chinese novel', 'value': 'chinese-novel' },
        { 'label': 'habyeol', 'value': 'habyeol' },
        { 'label': 'korean novel', 'value': 'korean-novel' },
        { 'label': 'Web Novel', 'value': 'web-novel' },
        { 'label': '삼심', 'value': '삼심' },
        { 'label': '호곡', 'value': '호곡' },
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
