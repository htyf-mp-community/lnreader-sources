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
  'id': 'allnovelread',
  'sourceSite': 'https://allnovelread.com/',
  'sourceName': 'AllNovelRead',
  'options': { 'lang': 'Spanish', 'reverseChapters': true },
  'filters': {
    'genre[]': {
      'type': 'Checkbox',
      'label': 'Genre',
      'value': [],
      'options': [
        { 'label': '16+', 'value': '16' },
        { 'label': 'Abogado/Abogada', 'value': 'abogado-abogada' },
        { 'label': 'Action', 'value': 'action' },
        { 'label': 'Advogdo', 'value': 'advogdo' },
        { 'label': 'affair of the heart', 'value': 'affair-of-the-heart' },
        { 'label': 'alfa', 'value': 'alfa' },
        { 'label': 'Alpha', 'value': 'alpha' },
        { 'label': 'Amable', 'value': 'amable' },
        { 'label': 'Amar', 'value': 'amar' },
        { 'label': 'Amor', 'value': 'amor' },
        { 'label': 'Amor caliente', 'value': 'amor-caliente' },
        {
          'label': 'amor depois do casamento',
          'value': 'amor-depois-do-casamento',
        },
        {
          'label': 'Amor después del matrimonio',
          'value': 'amor-despues-del-matrimonio',
        },
        { 'label': 'Amor destinado', 'value': 'amor-destinado' },
        { 'label': 'Amor doloroso', 'value': 'amor-doloroso' },
        { 'label': 'Amor dulce', 'value': 'amor-dulce' },
        { 'label': 'Amor e ódio', 'value': 'amor-e-odio' },
        { 'label': 'Amor e ódio Gravidez', 'value': 'amor-e-odio-gravidez' },
        { 'label': 'amor entre ex', 'value': 'amor-entre-ex' },
        { 'label': 'Amor forzado', 'value': 'amor-forzado' },
        { 'label': 'Amor Inocente', 'value': 'amor-inocente' },
        { 'label': 'amor predestinado', 'value': 'amor-predestinado' },
        { 'label': 'Amor y odio', 'value': 'amor-y-odio' },
        {
          'label': 'arrepentirse del divorcio',
          'value': 'arrepentirse-del-divorcio',
        },
        {
          'label': 'Arrepentirse Después de Herir a Su Mujer',
          'value': 'arrepentirse-despues-de-herir-a-su-mujer',
        },
        { 'label': 'Arrogante', 'value': 'arrogante' },
        { 'label': 'Asesinato', 'value': 'asesinato' },
        { 'label': 'Babby', 'value': 'babby' },
        { 'label': 'BABY', 'value': 'baby' },
        { 'label': 'Beauty', 'value': 'beauty' },
        { 'label': 'Bebê fofo', 'value': 'bebe-fofo' },
        { 'label': 'Bebé inteligente', 'value': 'bebe-inteligente' },
        { 'label': 'belleza', 'value': 'belleza' },
        { 'label': 'Belleza inusual', 'value': 'belleza-inusual' },
        { 'label': 'Bilionário', 'value': 'bilionario' },
        { 'label': 'Billionair', 'value': 'billionair' },
        { 'label': 'billionaire', 'value': 'billionaire' },
        { 'label': 'Billonario/Billonaria', 'value': 'billonario-billonaria' },
        { 'label': 'brilliant', 'value': 'brilliant' },
        { 'label': 'bxg', 'value': 'bxg' },
        { 'label': 'Bxg-novela', 'value': 'bxg-novela' },
        { 'label': 'Campus', 'value': 'campus' },
        { 'label': 'Casamiento', 'value': 'casamiento' },
        { 'label': 'CEO', 'value': 'ceo' },
        { 'label': 'city', 'value': 'city' },
        { 'label': 'Colegiala', 'value': 'colegiala' },
        { 'label': 'Comedia', 'value': 'comedia' },
        { 'label': 'Comedia-novela', 'value': 'comedia-novela' },
        { 'label': 'Comedy', 'value': 'comedy' },
        { 'label': 'contemporáneo', 'value': 'contemporaneo' },
        { 'label': 'Contract marriage', 'value': 'contract-marriage' },
        { 'label': 'cónyuge', 'value': 'conyuge' },
        { 'label': 'Corazón roto', 'value': 'corazon-roto' },
        { 'label': 'courtship', 'value': 'courtship' },
        {
          'label': 'Crecimiento del personaje',
          'value': 'crecimiento-del-personaje',
        },
        { 'label': 'Crimen organizado', 'value': 'crimen-organizado' },
        { 'label': 'Critical', 'value': 'critical' },
        { 'label': 'cruel', 'value': 'cruel' },
        { 'label': 'De pobre a rico', 'value': 'de-pobre-a-rico' },
        { 'label': 'Divertido', 'value': 'divertido' },
        { 'label': 'Divorce', 'value': 'divorce' },
        { 'label': 'Divorcio', 'value': 'divorcio' },
        { 'label': 'Doce', 'value': 'doce' },
        { 'label': 'Doctor', 'value': 'doctor' },
        { 'label': 'Dominador', 'value': 'dominador' },
        { 'label': 'Dominante', 'value': 'dominante' },
        { 'label': 'Dominante-novela', 'value': 'dominante-novela' },
        { 'label': 'drama', 'value': 'drama' },
        { 'label': 'dulce', 'value': 'dulce' },
        { 'label': 'Dulce Embarazada', 'value': 'dulce-embarazada' },
        { 'label': 'elegante', 'value': 'elegante' },
        { 'label': 'Embarazada', 'value': 'embarazada' },
        { 'label': 'En la actualidad', 'value': 'en-la-actualidad' },
        {
          'label': 'Enemigos a los amantes',
          'value': 'enemigos-a-los-amantes',
        },
        { 'label': 'existente', 'value': 'existente' },
        { 'label': 'Family', 'value': 'family' },
        { 'label': 'Fantasy', 'value': 'fantasy' },
        { 'label': 'Fated', 'value': 'fated' },
        { 'label': 'Fraco para forte/Pob', 'value': 'fraco-para-forte-pob' },
        { 'label': 'fuerte', 'value': 'fuerte' },
        { 'label': 'Goodgirl', 'value': 'goodgirl' },
        { 'label': 'Gravidez', 'value': 'gravidez' },
        { 'label': 'HE', 'value': 'he' },
        { 'label': 'heir/heiress', 'value': 'heir-heiress' },
        { 'label': 'hermoso', 'value': 'hermoso' },
        { 'label': 'Héroe pateador', 'value': 'heroe-pateador' },
        { 'label': 'Heroina', 'value': 'heroina' },
        { 'label': 'heroína Kickass', 'value': 'heroina-kickass' },
        { 'label': 'heterose*ual', 'value': 'heteroseual' },
        { 'label': 'historia de amor', 'value': 'historia-de-amor' },
        { 'label': 'Hot Romance', 'value': 'hot-romance' },
        { 'label': 'Humor', 'value': 'humor' },
        { 'label': 'Identidad secreta', 'value': 'identidad-secreta' },
        { 'label': 'Independente', 'value': 'independente' },
        { 'label': 'Independiente', 'value': 'independiente' },
        { 'label': 'Inocente', 'value': 'inocente' },
        { 'label': 'jefe', 'value': 'jefe' },
        { 'label': 'Jefe / CEO', 'value': 'jefe-ceo' },
        { 'label': 'kicking', 'value': 'kicking' },
        { 'label': 'king', 'value': 'king' },
        { 'label': 'legend', 'value': 'legend' },
        { 'label': 'Literature', 'value': 'literature' },
        { 'label': 'loser', 'value': 'loser' },
        { 'label': 'Love', 'value': 'love' },
        { 'label': 'Love & Culture', 'value': 'love-culture' },
        { 'label': 'love after marriage', 'value': 'love-after-marriage' },
        { 'label': 'love story', 'value': 'love-story' },
        { 'label': 'LOVEAFTERMARRIAGE', 'value': 'loveaftermarriage' },
        { 'label': 'lucky dog', 'value': 'lucky-dog' },
        {
          'label': 'Lugar para você Allnovelread',
          'value': 'lugar-para-voce-allnovelread',
        },
        { 'label': 'luna', 'value': 'luna' },
        { 'label': 'Madre soltera', 'value': 'madre-soltera' },
        { 'label': 'Mafia', 'value': 'mafia' },
        { 'label': 'magical world', 'value': 'magical-world' },
        { 'label': 'Malentendido', 'value': 'malentendido' },
        { 'label': 'Maquinación', 'value': 'maquinacion' },
        { 'label': 'Marriage', 'value': 'marriage' },
        { 'label': 'Matrimonio', 'value': 'matrimonio' },
        {
          'label': 'Matrimonio por Contrato',
          'value': 'matrimonio-por-contrato',
        },
        { 'label': 'Matrimonio relámpago', 'value': 'matrimonio-relampago' },
        { 'label': 'Medico', 'value': 'medico' },
        { 'label': 'Médico/Médica', 'value': 'medico-medica' },
        { 'label': 'millonaria', 'value': 'millonaria' },
        { 'label': 'modificación', 'value': 'modificacion' },
        { 'label': 'most millions', 'value': 'most-millions' },
        { 'label': 'Mucama', 'value': 'mucama' },
        { 'label': 'Mujer súper poderosa', 'value': 'mujer-super-poderosa' },
        { 'label': 'Multi-Millionairo', 'value': 'multi-millionairo' },
        { 'label': 'Multimillionairo', 'value': 'multimillionairo' },
        { 'label': 'Multimillonaria', 'value': 'multimillonaria' },
        { 'label': 'multimillonario', 'value': 'multimillonario' },
        {
          'label': 'Multimillonario-novela',
          'value': 'multimillonario-novela',
        },
        { 'label': 'MULTIPLEIDENTITIES', 'value': 'multipleidentities' },
        { 'label': 'Múltiples identidades', 'value': 'multiples-identidades' },
        { 'label': 'musculoso', 'value': 'musculoso' },
        { 'label': 'Nacimiento múltiple', 'value': 'nacimiento-multiple' },
        {
          'label': 'Novia embarazada a la fuga',
          'value': 'novia-embarazada-a-la-fuga',
        },
        { 'label': 'Obsesión', 'value': 'obsesion' },
        { 'label': 'Ocultar', 'value': 'ocultar' },
        { 'label': 'Optimista', 'value': 'optimista' },
        { 'label': 'others', 'value': 'others' },
        { 'label': 'Pasión de una noche', 'value': 'pasion-de-una-noche' },
        { 'label': 'Perao/Segunda chance', 'value': 'perao-segunda-chance' },
        { 'label': 'Perdedor', 'value': 'perdedor' },
        { 'label': 'Playboy', 'value': 'playboy' },
        { 'label': 'poderoso', 'value': 'poderoso' },
        { 'label': 'polygamy', 'value': 'polygamy' },
        { 'label': 'Posesivo', 'value': 'posesivo' },
        { 'label': 'possessive', 'value': 'possessive' },
        { 'label': 'Possessivo', 'value': 'possessivo' },
        { 'label': 'Powerful', 'value': 'powerful' },
        { 'label': 'presente', 'value': 'presente' },
        { 'label': 'Presidente', 'value': 'presidente' },
        { 'label': 'princess', 'value': 'princess' },
        { 'label': 'Protective', 'value': 'protective' },
        {
          'label': 'Protectormadre soltera',
          'value': 'protectormadre-soltera',
        },
        {
          'label': 'Reconquistar a mi pareja',
          'value': 'reconquistar-a-mi-pareja',
        },
        { 'label': 'rejected', 'value': 'rejected' },
        { 'label': 'relación', 'value': 'relacion' },
        { 'label': 'relationship', 'value': 'relationship' },
        { 'label': 'Renacido', 'value': 'renacido' },
        { 'label': 'Rey/Reina', 'value': 'rey-reina' },
        { 'label': 'Rich', 'value': 'rich' },
        { 'label': 'Rico', 'value': 'rico' },
        { 'label': 'Ricos', 'value': 'ricos' },
        { 'label': 'Romance', 'value': 'romance' },
        { 'label': 'romance caliente', 'value': 'romance-caliente' },
        { 'label': 'Romance/Romântico', 'value': 'romance-romantico' },
        { 'label': 'Romántic', 'value': 'romantic' },
        { 'label': 'Romantica', 'value': 'romantica' },
        { 'label': 'Romanticas', 'value': 'romanticas' },
        { 'label': 'Romantico', 'value': 'romantico' },
        { 'label': 'Secretos', 'value': 'secretos' },
        { 'label': 'secrets', 'value': 'secrets' },
        { 'label': 'seductive', 'value': 'seductive' },
        { 'label': 'Segunda Chance', 'value': 'segunda-chance' },
        { 'label': 'Segunda oportunidad', 'value': 'segunda-oportunidad' },
        { 'label': 'STRONGFEMALELEAD', 'value': 'strongfemalelead' },
        { 'label': 'Subrogación', 'value': 'subrogacion' },
        { 'label': 'Suspense', 'value': 'suspense' },
        { 'label': 'Sweet', 'value': 'sweet' },
        { 'label': 'SWEETLOVE', 'value': 'sweetlove' },
        { 'label': 'Teenager', 'value': 'teenager' },
        { 'label': 'Tierno', 'value': 'tierno' },
        { 'label': 'Tragedia', 'value': 'tragedia' },
        { 'label': 'Traición', 'value': 'traicion' },
        {
          'label': 'TraiciónReconquistar a mi pareja',
          'value': 'traicionreconquistar-a-mi-pareja',
        },
        { 'label': 'Triángulo amoroso', 'value': 'triangulo-amoroso' },
        { 'label': 'Trillizos', 'value': 'trillizos' },
        { 'label': 'Trio', 'value': 'trio' },
        { 'label': 'Una noche de pasion', 'value': 'una-noche-de-pasion' },
        { 'label': 'Universidad', 'value': 'universidad' },
        { 'label': 'Valente', 'value': 'valente' },
        { 'label': 'Valiente', 'value': 'valiente' },
        { 'label': 'Venanza', 'value': 'venanza' },
        { 'label': 'Werewolf', 'value': 'werewolf' },
        { 'label': 'Ya', 'value': 'ya' },
        { 'label': 'Youth', 'value': 'youth' },
      ],
    },
    'type[]': {
      'type': 'Checkbox',
      'label': 'Type',
      'value': [],
      'options': [
        { 'label': '16+', 'value': '16' },
        { 'label': 'alfa', 'value': 'alfa' },
        {
          'label': 'Allnovelread Sin vuelta atrás',
          'value': 'allnovelread-sin-vuelta-atras',
        },
        { 'label': 'Alpha', 'value': 'alpha' },
        { 'label': 'Amor dulce', 'value': 'amor-dulce' },
        { 'label': 'Amor y odio', 'value': 'amor-y-odio' },
        { 'label': 'Arrogante-novela', 'value': 'arrogante-novela' },
        { 'label': 'Billionaire', 'value': 'billionaire' },
        { 'label': 'Billonario', 'value': 'billonario' },
        { 'label': 'bxg', 'value': 'bxg' },
        { 'label': 'CEO', 'value': 'ceo' },
        { 'label': 'Contemporâneo', 'value': 'contemporaneo' },
        { 'label': 'Contract marriage', 'value': 'contract-marriage' },
        {
          'label': 'crecimiento-del-personaje-novela',
          'value': 'crecimiento-del-personaje-novela',
        },
        { 'label': 'Divorce', 'value': 'divorce' },
        { 'label': 'drama', 'value': 'drama' },
        { 'label': 'dulce', 'value': 'dulce' },
        {
          'label': 'El incesante acoso de mi ex marido',
          'value': 'el-incesante-acoso-de-mi-ex-marido',
        },
        {
          'label': 'Enganar al mejor amigo de mi novio',
          'value': 'enganar-al-mejor-amigo-de-mi-novio',
        },
        { 'label': 'Fantasy', 'value': 'fantasy' },
        { 'label': 'HE', 'value': 'he' },
        { 'label': 'heterosexual', 'value': 'heterosexual' },
        {
          'label': 'Historia-triste-novela',
          'value': 'historia-triste-novela',
        },
        { 'label': 'Hombre lobo', 'value': 'hombre-lobo' },
        { 'label': 'Hot Romance', 'value': 'hot-romance' },
        { 'label': 'Independiente', 'value': 'independiente' },
        { 'label': 'Inocente', 'value': 'inocente' },
        { 'label': 'king', 'value': 'king' },
        { 'label': 'Love', 'value': 'love' },
        { 'label': 'love after marriage', 'value': 'love-after-marriage' },
        { 'label': 'Luna', 'value': 'luna' },
        { 'label': 'Magical world', 'value': 'magical-world' },
        { 'label': 'millonaria', 'value': 'millonaria' },
        { 'label': 'Multi-Millionaire', 'value': 'multi-millionaire' },
        { 'label': 'Multimillionairo', 'value': 'multimillionairo' },
        { 'label': 'Multimillonario', 'value': 'multimillonario' },
        {
          'label': 'Nunca Longe Allnovelread',
          'value': 'nunca-longe-allnovelread',
        },
        { 'label': 'Posesivo', 'value': 'posesivo' },
        { 'label': 'Querida ex esposa', 'value': 'querida-ex-esposa' },
        { 'label': 'Romance', 'value': 'romance' },
        { 'label': 'Romane', 'value': 'romane' },
        { 'label': 'Romántica', 'value': 'romantica' },
        { 'label': 'Romanticas', 'value': 'romanticas' },
        { 'label': 'Romantico', 'value': 'romantico' },
        { 'label': 'Sweet', 'value': 'sweet' },
        { 'label': 'SWEETLOVE', 'value': 'sweetlove' },
        {
          'label': 'Te Quero de Volta Allnovelread',
          'value': 'te-quero-de-volta-allnovelread',
        },
        { 'label': 'Traicion en altar', 'value': 'traicion-en-altar' },
        {
          'label': 'Uma Ferida Que Nunca Se Cura Allnovelread',
          'value': 'uma-ferida-que-nunca-se-cura-allnovelread',
        },
        { 'label': 'Urban', 'value': 'urban' },
        { 'label': 'Urban/Realistic', 'value': 'urban-realistic' },
        { 'label': 'vuelva a mí', 'value': 'vuelva-a-mi' },
        { 'label': 'Werewolf', 'value': 'werewolf' },
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
