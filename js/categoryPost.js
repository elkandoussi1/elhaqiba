/* Category Post Widget — نسخة نظيفة ثنائية اللغة (عربي/إنجليزي)
 * Based on the Category Post widget by Fineshop Design (Median UI / Fletro Pro / iMagz).
 * Same output markup as the original; texts follow the blog language
 * (<html lang>), or the `lang` option. Any text can be overridden with `msg: {...}`.
 *
 * categoryPost({home, title, label, id, time:'published'|'updated', pstNm, thmbSize,
 *               snptLnth, pgn, ldCl, lang:'ar'|'en', msg:{...}})
 */
var categoryPostI18n = {
  ar: {
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    published: 'تم النشر في: ',
    updated: 'تم التحديث في: ',
    label: 'قسم',
    sponsored: 'إعلان ممول',
    noImage: 'لا توجد صورة',
    comments: 'التعليقات',
    readMore: 'قراءة المزيد',
    keepReading: 'متابعة القراءة',
    viewMore: 'عرض المزيد',
    noPostsLabel: 'لا توجد مشاركات في قسم «{label}» بعد.',
    noPosts: 'لا توجد مشاركات بعد.',
    loadFailed: 'تعذّر تحميل المشاركات :('
  },
  en: {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    published: 'Published: ',
    updated: 'Updated: ',
    label: 'Label',
    sponsored: 'Sponsored',
    noImage: 'No image',
    comments: 'Comments',
    readMore: 'Read more',
    keepReading: 'Keep reading',
    viewMore: 'View more',
    noPostsLabel: "No Post was found with label '{label}'.",
    noPosts: 'No Post was found.',
    loadFailed: 'Failed to load Posts :('
  }
};

function categoryPost(opts) {
  var cfg = {
    home: '/', title: 'Posts', pstNm: 6, thmbSize: 600, snptLnth: 150,
    time: 'published', pgn: true, ldCl: 'loaded', lang: '', msg: null
  };
  for (var k in opts) if (opts[k] !== 'undefined') cfg[k] = opts[k];

  var lang = String(cfg.lang || document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  var T = categoryPostI18n[lang] || categoryPostI18n.en, msg = {};
  for (k in T) msg[k] = T[k];
  if (cfg.msg) for (k in cfg.msg) msg[k] = cfg.msg[k];

  function esc(s) { return String(s == null ? '' : s).replace(/&(?![a-zA-Z#][a-zA-Z0-9]*;)/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function box() { return document.getElementById(cfg.id); }
  function date(iso) {
    iso = String(iso).substring(0, 10);
    return msg.months[parseInt(iso.substring(5, 7), 10) - 1] + ' ' + iso.substring(8, 10) + ', ' + iso.substring(0, 4);
  }

  var home = String(cfg.home).replace(/\/$/, '').replace(/.*?:\/\//g, '//') + '/';
  var hasLabel = cfg.label != null && String(cfg.label).length > 0;
  var url = home + 'feeds/posts/default' + encodeURI(hasLabel ? '/-/' + cfg.label : '') +
    '?alt=json&orderby=' + (cfg.time == 'updated' ? 'updated' : 'published') + '&max-results=' + cfg.pstNm;

  var ICON_CHAT = "<svg class='line' viewBox='0 0 24 24'><g transform='translate(2.000000, 2.000000)'><path d='M17.0710351,17.0698449 C14.0159481,20.1263505 9.48959549,20.7867004 5.78630747,19.074012 C5.23960769,18.8538953 1.70113357,19.8338667 0.933341969,19.0669763 C0.165550368,18.2990808 1.14639409,14.7601278 0.926307229,14.213354 C-0.787154393,10.5105699 -0.125888852,5.98259958 2.93020311,2.9270991 C6.83146881,-0.9756997 13.1697694,-0.9756997 17.0710351,2.9270991 C20.9803405,6.8359285 20.9723008,13.1680512 17.0710351,17.0698449 Z'></path></g></svg>";
  var ICON_PRODUCT = "<div class='spnr'><svg class='line' viewBox='0 0 24 24'><path d='M4.16989 15.3L8.69989 19.83C10.5599 21.69 13.5799 21.69 15.4499 19.83L19.8399 15.44C21.6999 13.58 21.6999 10.56 19.8399 8.69005L15.2999 4.17005C14.3499 3.22005 13.0399 2.71005 11.6999 2.78005L6.69989 3.02005C4.69989 3.11005 3.10989 4.70005 3.00989 6.69005L2.76989 11.69C2.70989 13.04 3.21989 14.35 4.16989 15.3Z'></path><path d='M9.5 12C10.8807 12 12 10.8807 12 9.5C12 8.11929 10.8807 7 9.5 7C8.11929 7 7 8.11929 7 9.5C7 10.8807 8.11929 12 9.5 12Z'></path></svg></div>";
  var ICON_SPONSORED = "<div class='spnr'><svg class='line' viewBox='0 0 24 24'><path d='M13 11L21.2 2.80005'></path><path d='M22 6.8V2H17.2'></path><path d='M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13'></path></svg></div>";

  function labelLink(term) {
    return "<a aria-label='" + esc(term) + "' data-text='" + esc(term) + "' href='" + cfg.home + 'search/label/' + encodeURI(term) + "' rel='tag'></a>";
  }

  function render(json) {
    var el = box();
    if (el == null) { console.log("Sorry, Container with id '" + cfg.id + "' was not found!"); return; }
    var feed = json.feed, entries = feed && feed.entry;
    if (!entries || entries.length == 0) {
      el.innerHTML = hasLabel
        ? (cfg.title != '' ? '<h2 class="title">' + cfg.title + '</h2>' : '') + "<div class='note'>" + esc(msg.noPostsLabel.replace('{label}', cfg.label)) + '</div>'
        : "<div class='note'>" + esc(msg.noPosts) + '</div>';
      return;
    }
    var out = (cfg.title ? '<h2 class="title">' + cfg.title + '</h2>' : '') + '<div class="blogPts ctgryPts">';
    for (var m = 0; m < entries.length; ++m) {
      var h = entries[m], link = '', i;
      for (i = 0; i < h.link.length; ++i) if (h.link[i].rel == 'alternate') link = h.link[i].href;
      var title = h.title.$t, cats = h.category || [], isProduct = false, isSponsored = false;
      for (i = 0; i < cats.length; ++i) {
        if (cats[i].term == 'Product') isProduct = true;
        if (cats[i].term == 'Sponsored') isSponsored = true;
      }
      var comments = h.thr$total ? String(h.thr$total.$t) : '';
      var snippet = ('content' in h && cfg.snptLnth > 0)
        ? h.content.$t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/<style.*?<\/style>/g, '').replace(/<\!--.*?-->/g, '')
            .split("<a name='more'>")[0].replace(/(<([^>]+)>)/gi, '').replace(/(\r\n|\n|\r)/gm, '').substring(0, cfg.snptLnth)
        : '';
      var img = h.media$thumbnail ? h.media$thumbnail.url : '';
      if (h.content && img == '') { var mm = /<img +(.*?)src=(['"])([^'"]+?)(['"])(.*?) *\/?>/i.exec(h.content.$t); img = mm && mm[3] ? mm[3] : ''; }
      var rw = img.includes('-rw') ? '' : '-rw-e30';
      img = img.replace(/.*?:\/\//g, '//').replace(/\/s[0-9]+(\-c)?/, '/s' + cfg.thmbSize + rw).replace(/\=s[0-9]+(\-c)?/, '=s' + cfg.thmbSize + rw).replace(/\=.*w[0-9].*h[0-9].*-c+(\-c)?/, '=s' + cfg.thmbSize + rw);
      var lb1 = cats[0] ? labelLink(cats[0].term) : '', lb2 = cats[1] ? labelLink(cats[1].term) : '';
      var when = cfg.time == 'updated' ? date(h.updated.$t) : date(h.published.$t);

      var fx = "<div class='iFxd'>" +
        (comments.match(/^[0-9]+$/) && comments != '0' && !isProduct ? "<a aria-label='" + esc(msg.comments) + "' class='cmnt' data-text='" + comments + "' href='" + link + "#comment' role='button'>" + ICON_CHAT + '</a>' : '') +
        (isProduct ? ICON_PRODUCT : '') + (isSponsored && !isProduct ? ICON_SPONSORED : '') + '</div>';
      var thumb = img != ''
        ? "<div class='pThmb'><a class='thmb' href='" + link + "'><img alt='" + esc(title) + "' class='imgThm lazy' data-src='" + img + "' src='data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='/></a>" + fx + '</div>'
        : "<div class='pThmb nul'><div class='thmb'><span class='imgThm' data-text='" + esc(msg.noImage) + "'></span></div>" + fx + '</div>';
      var head = lb1 ? "<div class='pHdr pSml'><div class='aNm'>" +
        (!isSponsored || isProduct ? "<div class='pLbls' data-text='" + esc(msg.label) + "'> " + lb1 + ' ' + lb2 + '</div>' : "<div class='pLbls nSpr'><span data-text='" + esc(msg.sponsored) + "'></span></div>") +
        '</div></div>' : '';
      var ttl = "<h2 class='pTtl aTtl sml'><a data-text='" + esc(title) + "' href='" + link + "' rel='bookmark'>" + esc(title) + '</a></h2>';
      var snp = snippet != '' ? "<div class='pSnpt" + (isProduct ? ' nTag' : '') + "'>" + snippet + '</div>' : '';
      var inf = "<div class='pInf pSml'><time class='aTtmp pTtmp pbl' data-text='" + when + "' title='" + (cfg.time == 'updated' ? msg.updated : msg.published) + when +
        "'></time><a aria-label='" + esc(msg.readMore) + "' class='pJmp' data-text='" + esc(msg.keepReading) + "' href='" + link + "'></a></div>";
      out += img != '' ? '<article class="ntry' + (isProduct ? ' pTag' : '') + '">' : "<article class='ntry noThmb" + (isProduct ? ' pTag' : '') + "'>";
      out += thumb + "<div class='pCntn'>" + head + ttl + snp + inf + '</div></article>';
    }
    var more = cfg.pgn == true
      ? "<div class='blogPg'><a aria-label='" + esc(msg.viewMore) + "' data-text='" + esc(hasLabel ? cfg.label + ' - ' + msg.viewMore : msg.viewMore) + "' href='" +
        (hasLabel ? cfg.home + 'search/label/' + encodeURI(cfg.label) : cfg.home + 'search') + "'></a></div>"
      : '';
    out += '</div>' + more;
    el.innerHTML = out;
    el.classList.add(cfg.ldCl);
    if (window.Defer && Defer.dom) Defer.dom('.lazy', 700, 'lazied', null, { rootMargin: '1px' });
  }

  var x = new XMLHttpRequest();
  x.onreadystatechange = function () {
    if (x.readyState != 4) return;
    if (x.status == 200) { try { render(JSON.parse(x.responseText)); } catch (e) { console.warn(e); } }
    else {
      console.log('Failed to get Blog Feeds with status: ' + x.status);
      if (box() != null) box().innerHTML = "<div class='note wr'>" + esc(msg.loadFailed) + '</div>';
    }
  };
  x.open('GET', url, true);
  x.send();
}
