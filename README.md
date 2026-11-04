<div align="center" markdown="1">

# 📚 الحقيبة

**قوالب وأدوات معرّبة لمدونات Blogger التعليمية**

<p>
  <a href="https://elkandoussi1.github.io/elhaqiba/"><kbd>📖 التوثيق</kbd></a>
  &nbsp;
  <a href="https://elkandoussi.blogspot.com/"><kbd>🌐 المدونة</kbd></a>
  &nbsp;
  <a href="https://github.com/elkandoussi1/elhaqiba/blob/main/LICENSE"><kbd>⚖️ GPL-3.0</kbd></a>
</p>

</div>

<div dir="rtl" markdown="1">

## ✦ عن الحقيبة

مجموعة ملفات **CSS وJavaScript** جاهزة لتخصيص قالب **Bookmark** على Blogger وتعريبه: بطاقات المقالات، الفهرس، المقالات ذات الصلة، مشغل الموسيقى، عدّاد التنزيل، موافقة الكوكيز، حماية الروابط، الترجمة، تلوين الشيفرة، وشريط تقدم القراءة.

> صفحة «عنّي» الشخصية انتقلت إلى [الملف الشخصي على GitHub](https://github.com/elkandoussi1). هذا المستودع مخصّص لأدوات القالب وملفاته فقط.

## ✦ المحتويات

### 🎨 ملفات التنسيق `css/`

| الملف | الوظيفة |
| :--- | :--- |
| `bookMark.min.css` | الأنماط العامة والنوافذ المنبثقة في القالب. |
| `css/BookmarkPosts.min.css` | أنماط بطاقات المقالات (Bookmark Posts v2.6). |
| `css/CookieConsent.min.css` | شريط موافقة ملفات تعريف الارتباط. |
| `css/CountdownDownloadBox.min.css` | صندوق تنزيل مع عدّاد زمني. |
| `css/MusicPlayer.min.css` | مشغّل موسيقى خفيف. |
| `css/RelatedPosts.min.css` | بطاقات المقالات ذات الصلة. |
| `css/TableOfContents.min.css` | فهرس محتويات المقال. |
| `css/ThemeColor.min.css` | ألوان القالب والوضع الليلي. |

### ⚙️ ملفات JavaScript `js/`

| الملف | الوظيفة |
| :--- | :--- |
| `js/AdditionalJavascript.min.js` | إضافات عامة للقالب. |
| `js/AdsenseAds.min.js` | إدارة إعلانات AdSense ومكانها. |
| `js/AutoChapters.min.js` | فصول تلقائية للمقالات والفيديوهات. |
| `js/AutoRelated.min.js` | مقالات ذات صلة تُولَّد تلقائيًا. |
| `js/BookmarkPosts.min.js` | وظائف بطاقات المقالات. |
| `js/CookieConsent.min.js` | منطق موافقة الكوكيز. |
| `js/CopyPreContent.min.js` | نسخ الشيفرة بالنقر المزدوج. |
| `js/CountdownDownloadBox.min.js` | عدّاد التنزيل. |
| `js/MusicPlayer.min.js` | مشغّل الموسيقى. |
| `js/NoInternetWidget.min.js` | تنبيه عند انقطاع الإنترنت. |
| `js/RelatedPosts.min.js` | المقالات ذات الصلة. |
| `js/TableOfContents.min.js` | بناء فهرس المحتويات. |
| `js/categoryPost.js` | ودجة «مقالات التصنيف» مع تعريب التاريخ والوسوم. |
| `js/idbprosafelink.js` | توليد روابط آمنة وحمايتها. |
| `js/progress.js` | شريط تقدم القراءة. |

### 📦 المكتبات `lib/`

| الملف | الوظيفة |
| :--- | :--- |
| `lib/jquery-3.6.0.min.js` | jQuery، تحتاجه معظم السكربتات. |
| `lib/vue-2.6.11.min.js` | Vue 2 لبعض الودجات. |
| `lib/highlight-11.5.0.min.js` | تلوين الشيفرة البرمجية. |
| `lib/translate.js` | ودجة ترجمة Google. |

## ✦ التركيب في Blogger

1. **خُذ نسخة احتياطية** من القالب: المظهر ← تعديل HTML ← نسخ احتياطي.
2. أضف ملفات `css` داخل `<b:skin>` أو قبل `</head>`.
3. أضف ملفات `js` قبل `</body>`، مع تحميل **jQuery أولًا**.
4. احفظ القالب ثم عاين المدونة على الهاتف والحاسوب.

### الطريقة الموصى بها: jsDelivr

استدعِ الملفات مباشرة من المستودع دون نسخها:

```html
<!-- في رأس القالب -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/elkandoussi1/elhaqiba@main/css/TableOfContents.min.css">

<!-- قبل </body> -->
<script src="https://cdn.jsdelivr.net/gh/elkandoussi1/elhaqiba@main/lib/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/elkandoussi1/elhaqiba@main/js/TableOfContents.min.js"></script>
```

> بدّل اسم الملف في الرابط حسب الأداة التي تريدها. الملفات مصغّرة (`.min`)؛ إن أردت التعديل عليها فاحتفظ بنسخة غير مصغّرة.

## ✦ شكر وتقدير

بعض السكربتات مأخوذة من مصادرها الأصلية ومعرّبة هنا، ومنها:

- **Fineshop Design** — `categoryPost.js` و`AutoChapters`.
- **IDN Blog Pro** — `idbprosafelink.js` و`AutoRelated`.
- **Taufik Nurrohman** — `RelatedPosts`.
- **blustemy.io** — فكرة `TableOfContents`.
- **pronulleds.blogspot.com** — `progress.js`.

راجع رأس كل ملف لمعرفة مصدره وترخيصه.

## ✦ الترخيص

هذا المستودع مرخّص تحت **GNU GPL v3.0** — اطّلع على [LICENSE](LICENSE). بعض الملفات المدرجة قد تخضع لتراخيص مصادرها الأصلية.

</div>

---

<p align="center">
  <a href="https://elkandoussi.blogspot.com/">المدونة</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/elkandoussi1">أحمد القندوسي</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/elkandoussi1/elhaqiba/issues">اقتراح أو ملاحظة</a>
</p>

<p align="center">
  <sub>أدوات صغيرة تختصر وقت الأستاذ · صُنعت بعناية في المغرب 🇲🇦</sub>
</p>
