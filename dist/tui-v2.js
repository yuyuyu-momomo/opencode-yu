var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS({
  "node_modules/emoji-regex/index.js"(exports, module) {
    module.exports = () => {
      return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter3) {
        const newDebug = createDebug(this.namespace + (typeof delimiter3 === "undefined" ? ":" : delimiter3) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = __require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix3 = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix3 + args[0].split("\n").join("\n" + prefix3);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/agent-base/dist/helpers.js
var require_helpers = __commonJS({
  "node_modules/agent-base/dist/helpers.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.req = exports.json = exports.toBuffer = void 0;
    var http2 = __importStar(__require("http"));
    var https2 = __importStar(__require("https"));
    async function toBuffer(stream) {
      let length = 0;
      const chunks = [];
      for await (const chunk of stream) {
        length += chunk.length;
        chunks.push(chunk);
      }
      return Buffer.concat(chunks, length);
    }
    exports.toBuffer = toBuffer;
    async function json(stream) {
      const buf = await toBuffer(stream);
      const str = buf.toString("utf8");
      try {
        return JSON.parse(str);
      } catch (_err) {
        const err = _err;
        err.message += ` (input: ${str})`;
        throw err;
      }
    }
    exports.json = json;
    function req(url, opts = {}) {
      const href = typeof url === "string" ? url : url.href;
      const req2 = (href.startsWith("https:") ? https2 : http2).request(url, opts);
      const promise = new Promise((resolve4, reject) => {
        req2.once("response", resolve4).once("error", reject).end();
      });
      req2.then = promise.then.bind(promise);
      return req2;
    }
    exports.req = req;
  }
});

// node_modules/agent-base/dist/index.js
var require_dist = __commonJS({
  "node_modules/agent-base/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Agent = void 0;
    var net = __importStar(__require("net"));
    var http2 = __importStar(__require("http"));
    var https_1 = __require("https");
    __exportStar(require_helpers(), exports);
    var INTERNAL = Symbol("AgentBaseInternalState");
    var Agent = class extends http2.Agent {
      constructor(opts) {
        super(opts);
        this[INTERNAL] = {};
      }
      /**
       * Determine whether this is an `http` or `https` request.
       */
      isSecureEndpoint(options) {
        if (options) {
          if (typeof options.secureEndpoint === "boolean") {
            return options.secureEndpoint;
          }
          if (typeof options.protocol === "string") {
            return options.protocol === "https:";
          }
        }
        const { stack } = new Error();
        if (typeof stack !== "string")
          return false;
        return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
      }
      // In order to support async signatures in `connect()` and Node's native
      // connection pooling in `http.Agent`, the array of sockets for each origin
      // has to be updated synchronously. This is so the length of the array is
      // accurate when `addRequest()` is next called. We achieve this by creating a
      // fake socket and adding it to `sockets[origin]` and incrementing
      // `totalSocketCount`.
      incrementSockets(name) {
        if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) {
          return null;
        }
        if (!this.sockets[name]) {
          this.sockets[name] = [];
        }
        const fakeSocket = new net.Socket({ writable: false });
        this.sockets[name].push(fakeSocket);
        this.totalSocketCount++;
        return fakeSocket;
      }
      decrementSockets(name, socket) {
        if (!this.sockets[name] || socket === null) {
          return;
        }
        const sockets = this.sockets[name];
        const index = sockets.indexOf(socket);
        if (index !== -1) {
          sockets.splice(index, 1);
          this.totalSocketCount--;
          if (sockets.length === 0) {
            delete this.sockets[name];
          }
        }
      }
      // In order to properly update the socket pool, we need to call `getName()` on
      // the core `https.Agent` if it is a secureEndpoint.
      getName(options) {
        const secureEndpoint = this.isSecureEndpoint(options);
        if (secureEndpoint) {
          return https_1.Agent.prototype.getName.call(this, options);
        }
        return super.getName(options);
      }
      createSocket(req, options, cb) {
        const connectOpts = {
          ...options,
          secureEndpoint: this.isSecureEndpoint(options)
        };
        const name = this.getName(connectOpts);
        const fakeSocket = this.incrementSockets(name);
        Promise.resolve().then(() => this.connect(req, connectOpts)).then((socket) => {
          this.decrementSockets(name, fakeSocket);
          if (socket instanceof http2.Agent) {
            try {
              return socket.addRequest(req, connectOpts);
            } catch (err) {
              return cb(err);
            }
          }
          this[INTERNAL].currentSocket = socket;
          super.createSocket(req, options, cb);
        }, (err) => {
          this.decrementSockets(name, fakeSocket);
          cb(err);
        });
      }
      createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = void 0;
        if (!socket) {
          throw new Error("No socket was returned in the `connect()` function");
        }
        return socket;
      }
      get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
      }
      set defaultPort(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].defaultPort = v;
        }
      }
      get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
      }
      set protocol(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].protocol = v;
        }
      }
    };
    exports.Agent = Agent;
  }
});

// node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = __commonJS({
  "node_modules/https-proxy-agent/dist/parse-proxy-response.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseProxyResponse = void 0;
    var debug_1 = __importDefault(require_src());
    var debug = (0, debug_1.default)("https-proxy-agent:parse-proxy-response");
    function parseProxyResponse(socket) {
      return new Promise((resolve4, reject) => {
        let buffersLength = 0;
        const buffers = [];
        function read() {
          const b = socket.read();
          if (b)
            ondata(b);
          else
            socket.once("readable", read);
        }
        function cleanup() {
          socket.removeListener("end", onend);
          socket.removeListener("error", onerror);
          socket.removeListener("readable", read);
        }
        function onend() {
          cleanup();
          debug("onend");
          reject(new Error("Proxy connection ended before receiving CONNECT response"));
        }
        function onerror(err) {
          cleanup();
          debug("onerror %o", err);
          reject(err);
        }
        function ondata(b) {
          buffers.push(b);
          buffersLength += b.length;
          const buffered = Buffer.concat(buffers, buffersLength);
          const endOfHeaders = buffered.indexOf("\r\n\r\n");
          if (endOfHeaders === -1) {
            debug("have not received end of HTTP headers yet...");
            read();
            return;
          }
          const headerParts = buffered.slice(0, endOfHeaders).toString("ascii").split("\r\n");
          const firstLine = headerParts.shift();
          if (!firstLine) {
            socket.destroy();
            return reject(new Error("No header received from proxy CONNECT response"));
          }
          const firstLineParts = firstLine.split(" ");
          const statusCode = +firstLineParts[1];
          const statusText = firstLineParts.slice(2).join(" ");
          const headers = {};
          for (const header of headerParts) {
            if (!header)
              continue;
            const firstColon = header.indexOf(":");
            if (firstColon === -1) {
              socket.destroy();
              return reject(new Error(`Invalid header from proxy CONNECT response: "${header}"`));
            }
            const key = header.slice(0, firstColon).toLowerCase();
            const value = header.slice(firstColon + 1).trimStart();
            const current = headers[key];
            if (typeof current === "string") {
              headers[key] = [current, value];
            } else if (Array.isArray(current)) {
              current.push(value);
            } else {
              headers[key] = value;
            }
          }
          debug("got proxy server response: %o %o", firstLine, headers);
          cleanup();
          resolve4({
            connect: {
              statusCode,
              statusText,
              headers
            },
            buffered
          });
        }
        socket.on("error", onerror);
        socket.on("end", onend);
        read();
      });
    }
    exports.parseProxyResponse = parseProxyResponse;
  }
});

// node_modules/https-proxy-agent/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/https-proxy-agent/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpsProxyAgent = void 0;
    var net = __importStar(__require("net"));
    var tls = __importStar(__require("tls"));
    var assert_1 = __importDefault(__require("assert"));
    var debug_1 = __importDefault(require_src());
    var agent_base_1 = require_dist();
    var url_1 = __require("url");
    var parse_proxy_response_1 = require_parse_proxy_response();
    var debug = (0, debug_1.default)("https-proxy-agent");
    var setServernameFromNonIpHost = (options) => {
      if (options.servername === void 0 && options.host && !net.isIP(options.host)) {
        return {
          ...options,
          servername: options.host
        };
      }
      return options;
    };
    var HttpsProxyAgent2 = class extends agent_base_1.Agent {
      constructor(proxy, opts) {
        super(opts);
        this.options = { path: void 0 };
        this.proxy = typeof proxy === "string" ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, "");
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
        this.connectOpts = {
          // Attempt to negotiate http/1.1 for proxy servers that support http/2
          ALPNProtocols: ["http/1.1"],
          ...opts ? omit(opts, "headers") : null,
          host,
          port
        };
      }
      /**
       * Called when the node-core HTTP client library is creating a
       * new HTTP request.
       */
      async connect(req, opts) {
        const { proxy } = this;
        if (!opts.host) {
          throw new TypeError('No "host" provided');
        }
        let socket;
        if (proxy.protocol === "https:") {
          debug("Creating `tls.Socket`: %o", this.connectOpts);
          socket = tls.connect(setServernameFromNonIpHost(this.connectOpts));
        } else {
          debug("Creating `net.Socket`: %o", this.connectOpts);
          socket = net.connect(this.connectOpts);
        }
        const headers = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
        const host = net.isIPv6(opts.host) ? `[${opts.host}]` : opts.host;
        let payload = `CONNECT ${host}:${opts.port} HTTP/1.1\r
`;
        if (proxy.username || proxy.password) {
          const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
          headers["Proxy-Authorization"] = `Basic ${Buffer.from(auth).toString("base64")}`;
        }
        headers.Host = `${host}:${opts.port}`;
        if (!headers["Proxy-Connection"]) {
          headers["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
        }
        for (const name of Object.keys(headers)) {
          payload += `${name}: ${headers[name]}\r
`;
        }
        const proxyResponsePromise = (0, parse_proxy_response_1.parseProxyResponse)(socket);
        socket.write(`${payload}\r
`);
        const { connect, buffered } = await proxyResponsePromise;
        req.emit("proxyConnect", connect);
        this.emit("proxyConnect", connect, req);
        if (connect.statusCode === 200) {
          req.once("socket", resume);
          if (opts.secureEndpoint) {
            debug("Upgrading socket connection to TLS");
            return tls.connect({
              ...omit(setServernameFromNonIpHost(opts), "host", "path", "port"),
              socket
            });
          }
          return socket;
        }
        socket.destroy();
        const fakeSocket = new net.Socket({ writable: false });
        fakeSocket.readable = true;
        req.once("socket", (s) => {
          debug("Replaying proxy buffer for failed request");
          (0, assert_1.default)(s.listenerCount("data") > 0);
          s.push(buffered);
          s.push(null);
        });
        return fakeSocket;
      }
    };
    HttpsProxyAgent2.protocols = ["http", "https"];
    exports.HttpsProxyAgent = HttpsProxyAgent2;
    function resume(socket) {
      socket.resume();
    }
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
  }
});

// src/ui/v2.ts
import { Plugin } from "@opencode/plugin/tui";

// src/ui/index.tsx
import { memo as _$memo2 } from "@opentui/solid";
import { createTextNode as _$createTextNode2 } from "@opentui/solid";
import { insertNode as _$insertNode2 } from "@opentui/solid";
import { use as _$use2 } from "@opentui/solid";
import { effect as _$effect2 } from "@opentui/solid";
import { insert as _$insert2 } from "@opentui/solid";
import { setProp as _$setProp2 } from "@opentui/solid";
import { createElement as _$createElement2 } from "@opentui/solid";
import { createComponent as _$createComponent2 } from "@opentui/solid";
import { createEffect as createEffect2, createMemo, createSignal as createSignal2, onCleanup as onCleanup2, onMount, Show as Show2 } from "solid-js";
import { ScrollBoxRenderable } from "@opentui/core";
import { dirname as dirname4, resolve as resolve3, basename as basename3 } from "node:path";
import { watch as watch2 } from "node:fs";
import { access as access4 } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createHash as createHash3 } from "node:crypto";

// node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const ST = "(?:\\u0007|\\u001B\\u005C|\\u009C)";
  const osc = `(?:(?:\\u001B\\]|\\u009D)[^\\u0007\\u001B\\u009C\\u009D]*${ST})`;
  const csi = "[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]";
  const pattern = `${osc}|${csi}`;
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(regex, "");
}

// node_modules/get-east-asian-width/lookup-data.js
var ambiguousMinimalCodePoint = 161;
var ambiguousMaximumCodePoint = 1114109;
var ambiguousRanges = [161, 161, 164, 164, 167, 168, 170, 170, 173, 174, 176, 180, 182, 186, 188, 191, 198, 198, 208, 208, 215, 216, 222, 225, 230, 230, 232, 234, 236, 237, 240, 240, 242, 243, 247, 250, 252, 252, 254, 254, 257, 257, 273, 273, 275, 275, 283, 283, 294, 295, 299, 299, 305, 307, 312, 312, 319, 322, 324, 324, 328, 331, 333, 333, 338, 339, 358, 359, 363, 363, 462, 462, 464, 464, 466, 466, 468, 468, 470, 470, 472, 472, 474, 474, 476, 476, 593, 593, 609, 609, 708, 708, 711, 711, 713, 715, 717, 717, 720, 720, 728, 731, 733, 733, 735, 735, 768, 879, 913, 929, 931, 937, 945, 961, 963, 969, 1025, 1025, 1040, 1103, 1105, 1105, 8208, 8208, 8211, 8214, 8216, 8217, 8220, 8221, 8224, 8226, 8228, 8231, 8240, 8240, 8242, 8243, 8245, 8245, 8251, 8251, 8254, 8254, 8308, 8308, 8319, 8319, 8321, 8324, 8364, 8364, 8451, 8451, 8453, 8453, 8457, 8457, 8467, 8467, 8470, 8470, 8481, 8482, 8486, 8486, 8491, 8491, 8531, 8532, 8539, 8542, 8544, 8555, 8560, 8569, 8585, 8585, 8592, 8601, 8632, 8633, 8658, 8658, 8660, 8660, 8679, 8679, 8704, 8704, 8706, 8707, 8711, 8712, 8715, 8715, 8719, 8719, 8721, 8721, 8725, 8725, 8730, 8730, 8733, 8736, 8739, 8739, 8741, 8741, 8743, 8748, 8750, 8750, 8756, 8759, 8764, 8765, 8776, 8776, 8780, 8780, 8786, 8786, 8800, 8801, 8804, 8807, 8810, 8811, 8814, 8815, 8834, 8835, 8838, 8839, 8853, 8853, 8857, 8857, 8869, 8869, 8895, 8895, 8978, 8978, 9312, 9449, 9451, 9547, 9552, 9587, 9600, 9615, 9618, 9621, 9632, 9633, 9635, 9641, 9650, 9651, 9654, 9655, 9660, 9661, 9664, 9665, 9670, 9672, 9675, 9675, 9678, 9681, 9698, 9701, 9711, 9711, 9733, 9734, 9737, 9737, 9742, 9743, 9756, 9756, 9758, 9758, 9792, 9792, 9794, 9794, 9824, 9825, 9827, 9829, 9831, 9834, 9836, 9837, 9839, 9839, 9886, 9887, 9919, 9919, 9926, 9933, 9935, 9939, 9941, 9953, 9955, 9955, 9960, 9961, 9963, 9969, 9972, 9972, 9974, 9977, 9979, 9980, 9982, 9983, 10045, 10045, 10102, 10111, 11094, 11097, 12872, 12879, 57344, 63743, 65024, 65039, 65533, 65533, 127232, 127242, 127248, 127277, 127280, 127337, 127344, 127373, 127375, 127376, 127387, 127404, 917760, 917999, 983040, 1048573, 1048576, 1114109];
var fullwidthMinimalCodePoint = 12288;
var fullwidthMaximumCodePoint = 65510;
var fullwidthRanges = [12288, 12288, 65281, 65376, 65504, 65510];
var wideMinimalCodePoint = 4352;
var wideMaximumCodePoint = 262141;
var wideRanges = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101594, 101631, 101664, 101760, 101874, 101888, 102801, 102816, 102866, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110888, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110952, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127406, 127406, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128729, 128732, 128735, 128747, 128748, 128756, 128764, 128986, 128986, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129734, 129736, 129736, 129740, 129757, 129759, 129771, 129775, 129786, 131072, 196605, 196608, 262141];

// node_modules/get-east-asian-width/utilities.js
var isInRange = (ranges, codePoint) => {
  let low = 0;
  let high = Math.floor(ranges.length / 2) - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const i = mid * 2;
    if (codePoint < ranges[i]) {
      high = mid - 1;
    } else if (codePoint > ranges[i + 1]) {
      low = mid + 1;
    } else {
      return true;
    }
  }
  return false;
};

// node_modules/get-east-asian-width/lookup.js
var commonCjkCodePoint = 19968;
var [wideFastPathStart, wideFastPathEnd] = /* @__PURE__ */ findWideFastPathRange(wideRanges);
function findWideFastPathRange(ranges) {
  let fastPathStart = ranges[0];
  let fastPathEnd = ranges[1];
  for (let index = 0; index < ranges.length; index += 2) {
    const start = ranges[index];
    const end = ranges[index + 1];
    if (commonCjkCodePoint >= start && commonCjkCodePoint <= end) {
      return [start, end];
    }
    if (end - start > fastPathEnd - fastPathStart) {
      fastPathStart = start;
      fastPathEnd = end;
    }
  }
  return [fastPathStart, fastPathEnd];
}
var isAmbiguous = (codePoint) => {
  if (codePoint < ambiguousMinimalCodePoint || codePoint > ambiguousMaximumCodePoint) {
    return false;
  }
  return isInRange(ambiguousRanges, codePoint);
};
var isFullwidth = (codePoint) => {
  if (codePoint < fullwidthMinimalCodePoint || codePoint > fullwidthMaximumCodePoint) {
    return false;
  }
  return isInRange(fullwidthRanges, codePoint);
};
var isWide = (codePoint) => {
  if (codePoint >= wideFastPathStart && codePoint <= wideFastPathEnd) {
    return true;
  }
  if (codePoint < wideMinimalCodePoint || codePoint > wideMaximumCodePoint) {
    return false;
  }
  return isInRange(wideRanges, codePoint);
};

// node_modules/get-east-asian-width/index.js
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullwidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}

// node_modules/string-width/index.js
var import_emoji_regex = __toESM(require_emoji_regex(), 1);
var segmenter = new Intl.Segmenter();
var defaultIgnorableCodePointRegex = /^\p{Default_Ignorable_Code_Point}$/u;
function stringWidth(string, options = {}) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;
  if (!countAnsiEscapeCodes) {
    string = stripAnsi(string);
  }
  if (string.length === 0) {
    return 0;
  }
  let width = 0;
  const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
  for (const { segment: character } of segmenter.segment(string)) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 8203 && codePoint <= 8207 || codePoint === 65279) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879 || codePoint >= 6832 && codePoint <= 6911 || codePoint >= 7616 && codePoint <= 7679 || codePoint >= 8400 && codePoint <= 8447 || codePoint >= 65056 && codePoint <= 65071) {
      continue;
    }
    if (codePoint >= 55296 && codePoint <= 57343) {
      continue;
    }
    if (codePoint >= 65024 && codePoint <= 65039) {
      continue;
    }
    if (defaultIgnorableCodePointRegex.test(character)) {
      continue;
    }
    if ((0, import_emoji_regex.default)().test(character)) {
      width += 2;
      continue;
    }
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
  }
  return width;
}

// src/library/text-reader.mjs
import { readFile as readFile3, stat, realpath, readdir as readdir2 } from "node:fs/promises";
import { resolve as resolve2, basename, extname } from "node:path";
import { homedir } from "node:os";

// src/library/vault.mjs
import { randomBytes, createCipheriv, createDecipheriv, createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
var magic = Buffer.from("MOYU1");
var aad = Buffer.from("opencode-moyu:library:v1");
var defaultKeyFile = (directory) => resolve(directory, "../keys/library.key");
var LibraryVault = class {
  #key;
  constructor(keyFile) {
    this.keyFile = keyFile;
  }
  async key(create = true) {
    if (this.#key) return this.#key;
    try {
      this.#key = await readFile(this.keyFile);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      if (!create) throw new Error("\u7F3A\u5C11\u8D44\u6599\u5E93\u5BC6\u94A5\uFF0C\u8BF7\u6062\u590D\u539F\u5BC6\u94A5\u6587\u4EF6");
      await mkdir(dirname(this.keyFile), { recursive: true, mode: 448 });
      try {
        await writeFile(this.keyFile, randomBytes(32), { flag: "wx", mode: 384 });
      } catch (error2) {
        if (error2.code !== "EEXIST") throw error2;
      }
      this.#key = await readFile(this.keyFile);
    }
    if (this.#key.length !== 32) throw new Error("\u8D44\u6599\u5E93\u5BC6\u94A5\u957F\u5EA6\u5F02\u5E38");
    return this.#key;
  }
  async seal(value) {
    const nonce = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", await this.key(), nonce);
    cipher.setAAD(aad);
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
    return Buffer.concat([magic, nonce, cipher.getAuthTag(), encrypted]);
  }
  async unseal(bytes) {
    if (bytes.length < 33 || !bytes.subarray(0, 5).equals(magic)) throw new Error("\u4E0D\u662F\u53D7\u652F\u6301\u7684\u52A0\u5BC6\u8D44\u6599\u6587\u4EF6");
    try {
      const decipher = createDecipheriv("aes-256-gcm", await this.key(false), bytes.subarray(5, 17));
      decipher.setAAD(aad);
      decipher.setAuthTag(bytes.subarray(17, 33));
      return JSON.parse(Buffer.concat([decipher.update(bytes.subarray(33)), decipher.final()]).toString("utf8"));
    } catch {
      throw new Error("\u8D44\u6599\u89E3\u5BC6\u5931\u8D25\uFF1A\u5BC6\u94A5\u4E0D\u5339\u914D\uFF0C\u6216\u6587\u4EF6\u5DF2\u635F\u574F");
    }
  }
};

// src/library/store.mjs
import { mkdir as mkdir2, readFile as readFile2, writeFile as writeFile2, rename, unlink, open, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID, createHash as createHash2 } from "node:crypto";
var stableId = (value) => createHash2("sha256").update(value).digest("hex").slice(0, 24);
async function atomicWrite(path, content) {
  const temporary = path + "." + randomUUID() + ".tmp";
  try {
    await writeFile2(temporary, content, { flag: "wx", mode: 384 });
    await rename(temporary, path);
  } finally {
    await unlink(temporary).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
}
var LibraryStore = class {
  constructor(directory, { keyFile = defaultKeyFile(directory) } = {}) {
    this.directory = directory;
    this.internal = join(directory, ".moyu");
    this.vault = new LibraryVault(keyFile);
  }
  async ready() {
    for (const name of ["jobs", "resources", "parts"]) await mkdir2(join(this.internal, name), { recursive: true });
  }
  jobPath(id) {
    return join(this.internal, "jobs", id + ".enc");
  }
  partPath(id, index) {
    return join(this.internal, "parts", id, String(index).padStart(6, "0") + ".enc");
  }
  async readJob(id) {
    try {
      return await this.vault.unseal(await readFile2(this.jobPath(id)));
    } catch (error) {
      if (error.code === "ENOENT") return void 0;
      throw error;
    }
  }
  async writeJob(job) {
    await atomicWrite(this.jobPath(job.id), await this.vault.seal(job));
  }
  async writePart(id, index, text) {
    await mkdir2(join(this.internal, "parts", id), { recursive: true });
    await atomicWrite(this.partPath(id, index), await this.vault.seal({ text }));
  }
  async putResource(resource) {
    await this.ready();
    await atomicWrite(join(this.internal, "resources", resource.id + ".enc"), await this.vault.seal(resource));
  }
  async resources() {
    await this.ready();
    const out = [];
    for (const name of await readdir(join(this.internal, "resources"))) {
      if (name.endsWith(".enc")) out.push(await this.vault.unseal(await readFile2(join(this.internal, "resources", name))));
    }
    return out;
  }
  async readPart(id, index) {
    return (await this.vault.unseal(await readFile2(this.partPath(id, index)))).text;
  }
  async writeBook(id, title, text) {
    await this.ready();
    const path = join(this.directory, id + ".moyubook");
    await atomicWrite(path, await this.vault.seal({ schemaVersion: 1, resourceId: id, title, text }));
    return path;
  }
  async importLocal(book) {
    const id = stableId("local:" + book.path);
    return this.withJobLock(id, async () => {
      const path = await this.writeBook(id, book.title, book.text);
      await this.putResource({ schemaVersion: 1, id, kind: "novel", title: book.title, source: { adapter: "local-text", url: book.path }, assets: [{ role: "body", mime: "application/x-moyu-book", path }], metadata: { imported: true }, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
      return { ...book, path, resourceId: id };
    });
  }
  async deleteResource(id) {
    if (!/^[a-f0-9]{24}$/.test(id)) throw new Error("\u65E0\u6548\u8D44\u6599 ID");
    return this.withJobLock(id, async () => {
      for (const path of [join(this.directory, id + ".moyubook"), this.jobPath(id), join(this.internal, "resources", id + ".enc"), join(this.internal, "media", id + ".moyuvid")]) {
        await unlink(path).catch((error) => {
          if (error.code !== "ENOENT") throw error;
        });
      }
      await rm(join(this.internal, "parts", id), { recursive: true, force: true });
      return { deleted: id, originalFilesPreserved: true };
    });
  }
  async withJobLock(id, fn) {
    await this.ready();
    const path = join(this.internal, "jobs", id + ".lock");
    let handle;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        handle = await open(path, "wx", 384);
        break;
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
        const lock = JSON.parse(await readFile2(path, "utf8"));
        let alive = true;
        try {
          process.kill(lock.pid, 0);
        } catch (error2) {
          if (error2.code === "ESRCH") alive = false;
        }
        if (alive) throw new Error("\u8FD9\u672C\u4E66\u5DF2\u6709\u91C7\u96C6\u4EFB\u52A1\u5728\u8FD0\u884C\uFF0C\u8BF7\u7B49\u5F85\u540E\u91CD\u8BD5");
        await unlink(path);
      }
    }
    if (!handle) throw new Error("\u65E0\u6CD5\u53D6\u5F97\u91C7\u96C6\u4EFB\u52A1\u9501");
    try {
      await handle.writeFile(JSON.stringify({ pid: process.pid, startedAt: (/* @__PURE__ */ new Date()).toISOString() }));
      return await fn();
    } finally {
      await handle.close();
      await unlink(path);
    }
  }
};

// src/library/text-reader.mjs
import { dirname as dirname2 } from "node:path";
var segmenter2 = new Intl.Segmenter("zh", { granularity: "grapheme" });
var chapterPattern = /^(?:第[零〇一二三四五六七八九十百千万两\d]+[章节回卷部篇集](?:\s|[：:、.．]|[^\d]).*|第[零〇一二三四五六七八九十百千万两\d]+[章节回卷部篇集]|(?:序章|序言|楔子|引子|前言|尾声|后记|终章|番外)(?:\s.*|[：:、].*)?|chapter\s+\d+.*)$/iu;
function expandPath(input, cwd = process.cwd()) {
  const value = input.trim().replace(/^(["'])(.*)\1$/, "$2");
  if (!value) throw new Error("\u8BF7\u8F93\u5165\u5C0F\u8BF4\u6587\u4EF6\u8DEF\u5F84");
  return resolve2(cwd, value === "~" ? homedir() : value.startsWith("~/") ? homedir() + value.slice(1) : value);
}
function decodeBook(bytes) {
  if (bytes[0] === 255 && bytes[1] === 254) return new TextDecoder("utf-16le").decode(bytes);
  if (bytes[0] === 254 && bytes[1] === 255) return new TextDecoder("utf-16be").decode(bytes);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return new TextDecoder("gb18030", { fatal: true }).decode(bytes);
  }
}
function cleanText(text) {
  return text.replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, "").replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, "").replace(/\r\n?/g, "\n").replace(/\t/g, "    ").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f\u202a-\u202e\u2066-\u2069]/g, "").replace(/^\uFEFF/, "");
}
function chapterIdentity(title) {
  const match = title.normalize("NFKC").match(/^第([零〇一二三四五六七八九十百千万两\d]+)([章节回卷部篇集])(.*)$/u);
  if (!match) return title;
  const digits = { \u96F6: 0, "\u3007": 0, \u4E00: 1, \u4E8C: 2, \u4E24: 2, \u4E09: 3, \u56DB: 4, \u4E94: 5, \u516D: 6, \u4E03: 7, \u516B: 8, \u4E5D: 9 };
  const units = { \u5341: 10, \u767E: 100, \u5343: 1e3, \u4E07: 1e4 };
  let total = 0, section = 0, digit = 0;
  if (/^\d+$/u.test(match[1])) total = Number(match[1]);
  else {
    for (const char of match[1]) {
      if (char in digits) digit = digits[char];
      else if (units[char] === 1e4) {
        total += (section + digit) * 1e4;
        section = 0;
        digit = 0;
      } else if (units[char]) {
        section += (digit || 1) * units[char];
        digit = 0;
      } else return title;
    }
    total += section + digit;
  }
  return `${total}:${match[2]}:${match[3].replace(/\s+/gu, "")}`;
}
function chaptersOf(text) {
  const chapters = [];
  let offset = 0, headingEnd = 0;
  for (const line of text.split("\n")) {
    const title = line.trim();
    if (title.length <= 100 && chapterPattern.test(title)) {
      const previous = chapters.at(-1);
      if (!previous || chapterIdentity(previous.title) !== chapterIdentity(title) || text.slice(headingEnd, offset).trim()) chapters.push({ title, offset });
      headingEnd = offset + line.length;
    }
    offset += line.length + 1;
  }
  return chapters;
}
function paginate(text, width = 36, rows = 16) {
  if (!Number.isInteger(width) || width < 2 || !Number.isInteger(rows) || rows < 1) throw new Error("\u5206\u9875\u5C3A\u5BF8\u65E0\u6548");
  const lines = [];
  let line = "", columns = 0, start = 0, offset = 0;
  for (const paragraph of text.split("\n")) {
    for (const { segment } of segmenter2.segment(paragraph)) {
      const cells = stringWidth(segment);
      if (columns + cells > width && line) {
        lines.push({ text: line, start });
        line = "";
        columns = 0;
        start = offset;
      }
      line += segment;
      columns += cells;
      offset += segment.length;
    }
    lines.push({ text: line, start });
    offset += 1;
    start = offset;
    line = "";
    columns = 0;
  }
  const pages = [];
  for (let index = 0; index < lines.length; index += rows) {
    pages.push({ start: lines[index].start, text: lines.slice(index, index + rows).map((item) => item.text).join("\n") });
  }
  while (pages.length > 1 && !pages.at(-1).text.trim()) pages.pop();
  return pages;
}
function pageAt(pages, offset) {
  let low = 0, high = pages.length - 1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (pages[mid].start <= offset) low = mid;
    else high = mid - 1;
  }
  return low;
}
async function loadBook(input, cwd, { keyFile } = {}) {
  const path = await realpath(expandPath(input, cwd));
  const info = await stat(path);
  if (!info.isFile()) throw new Error("\u8BF7\u9009\u62E9 TXT \u6216 Markdown \u6587\u4EF6");
  if (extname(path).toLowerCase() === ".moyubook") {
    if (info.size > 34 * 1024 * 1024) throw new Error("\u52A0\u5BC6\u6587\u4EF6\u8D85\u8FC7\u5927\u5C0F\u9650\u5236");
    const payload = await new LibraryVault(keyFile || defaultKeyFile(dirname2(path))).unseal(await readFile3(path));
    if (typeof payload.title !== "string" || typeof payload.text !== "string" || typeof payload.resourceId !== "string") throw new Error("\u52A0\u5BC6\u8D44\u6599\u683C\u5F0F\u65E0\u6548");
    return { path, title: payload.title, text: payload.text, chapters: chaptersOf(payload.text), resourceId: payload.resourceId };
  }
  if (![".txt", ".md"].includes(extname(path).toLowerCase())) throw new Error("\u76EE\u524D\u652F\u6301 .txt\u3001.md \u548C\u52A0\u5BC6\u8D44\u6599\u6587\u4EF6");
  if (info.size > 32 * 1024 * 1024) throw new Error("\u6587\u4EF6\u8D85\u8FC7 32 MiB\uFF0C\u8BF7\u6309\u5377\u62C6\u5206");
  const text = cleanText(decodeBook(await readFile3(path)));
  if (!text.trim()) throw new Error("\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u53EF\u9605\u8BFB\u7684\u5185\u5BB9");
  return { path, title: basename(path, extname(path)), text, chapters: chaptersOf(text) };
}
async function listBooks(directory, { keyFile } = {}) {
  const entries = await readdir2(directory, { withFileTypes: true });
  const plain = entries.filter((item) => item.isFile() && /\.(?:txt|md)$/i.test(item.name)).map((item) => ({ title: basename(item.name, extname(item.name)), path: resolve2(directory, item.name) })).sort((a, b) => a.title.localeCompare(b.title, "zh"));
  const resources = entries.some((item) => item.name === ".moyu") ? await new LibraryStore(directory, { keyFile }).resources() : [];
  const managed = resources.filter((item) => item.kind === "novel").map((item) => ({ title: item.title, path: item.assets.find((asset) => asset.role === "body")?.path, resourceId: item.id })).filter((item) => item.path);
  return [...managed, ...plain.filter((item) => !managed.some((saved) => saved.title === item.title))];
}

// src/ui/sidebar-layout.mjs
function sidebarLayout(scrollbox) {
  const sidebar = scrollbox.parent;
  const pane = sidebar?.parent;
  const frame = pane?.parent;
  const docked = frame?.getChildren().some((node) => node.id === "session-pane");
  if (!sidebar || sidebar.width < 32 || sidebar.width > 100 || !sidebar.getChildren().includes(scrollbox)) return;
  if (docked && (pane.width !== sidebar.width || pane.getChildren().length !== 1)) return;
  const targets = (docked ? [sidebar, pane] : [sidebar]).map((node) => ({ node, original: node.width, applied: void 0 }));
  function restore() {
    for (const item of targets) {
      if (!item.node.isDestroyed && item.applied !== void 0 && item.node.width === item.applied) item.node.width = item.original;
      item.applied = void 0;
    }
  }
  return {
    frame: docked ? frame : void 0,
    apply(percent, terminalWidth) {
      if (percent === void 0) return restore();
      const total = docked ? Math.max(1, terminalWidth - (frame.screenX ?? frame.x ?? 0)) : terminalWidth;
      const max = Math.max(36, Math.min(Math.floor(total * 0.6), total - 44));
      const width = Math.max(36, Math.min(max, Math.round(total * percent / 100)));
      for (const item of targets) {
        if (item.node.isDestroyed) continue;
        if (item.node.width !== width) item.node.width = width;
        item.applied = width;
      }
    },
    restore
  };
}
function sidebarDock(reader, viewport, changed = () => {
}) {
  const container = reader.parent;
  if (!container?.getChildren().includes(reader)) return;
  const original = container.minHeight ?? null;
  const previous = container.onSizeChange;
  const resized = function() {
    previous?.call(this);
    queueMicrotask(changed);
  };
  container.onSizeChange = resized;
  let minimum;
  function restore() {
    if (minimum !== void 0 && !container.isDestroyed) container.minHeight = original;
    if (!container.isDestroyed && container.onSizeChange === resized) container.onSizeChange = previous;
    minimum = void 0;
  }
  return {
    measure(active) {
      if (!active || reader.isDestroyed || viewport.isDestroyed || container.isDestroyed) {
        restore();
        return 0;
      }
      if (minimum !== viewport.height) {
        minimum = viewport.height;
        container.minHeight = minimum;
      }
      const cards = container.getChildren().filter((node) => node !== reader && !node.isDestroyed && node.visible !== false && node.height > 0);
      return cards.reduce((rows, node) => rows + node.height + 1, 0);
    },
    restore
  };
}

// src/ui/video.tsx
import { createTextNode as _$createTextNode } from "@opentui/solid";
import { insertNode as _$insertNode } from "@opentui/solid";
import { effect as _$effect } from "@opentui/solid";
import { insert as _$insert } from "@opentui/solid";
import { use as _$use } from "@opentui/solid";
import { setProp as _$setProp } from "@opentui/solid";
import { createElement as _$createElement } from "@opentui/solid";
import { memo as _$memo } from "@opentui/solid";
import { createComponent as _$createComponent } from "@opentui/solid";
import { createEffect, createSignal, For, Show, untrack, onCleanup } from "solid-js";
import * as OpenTui from "@opentui/core";
import { watch } from "node:fs";
import { access as access3 } from "node:fs/promises";
import { join as join6 } from "node:path";

// src/media/runtime.mjs
import { spawn, execFile } from "node:child_process";
import { access, readdir as readdir3, realpath as realpath2, stat as stat2 } from "node:fs/promises";
import { constants } from "node:fs";
import { join as join2, delimiter, extname as extname2, basename as basename2 } from "node:path";
import { homedir as homedir2 } from "node:os";
import { promisify } from "node:util";
var execute = promisify(execFile);
var binaries = /* @__PURE__ */ new Map();
async function mediaBinary(name) {
  if (binaries.has(name)) return binaries.get(name);
  const custom = process.env["MOYU_" + name.toUpperCase()];
  const dirs = [process.env.MOYU_MEDIA_BIN, join2(homedir2(), ".local/share/opencode-moyu/media/bin"), ...(process.env.PATH || "").split(delimiter)].filter(Boolean);
  for (const root of ["miniconda3", "miniforge3", "anaconda3"]) {
    const base = join2(homedir2(), root);
    dirs.push(join2(base, "bin"));
    for (const env of (await readdir3(join2(base, "envs")).catch(() => [])).slice(0, 32)) dirs.push(join2(base, "envs", env, "bin"));
  }
  const candidates = custom ? [custom] : dirs.flatMap((dir) => process.platform === "win32" ? [join2(dir, name + ".exe")] : [join2(dir, name), join2(dir, name + ".exe")]);
  for (const path of candidates) {
    try {
      await access(path, constants.X_OK);
      await execute(path, ["-version"], { timeout: 5e3, maxBuffer: 32768, windowsHide: true });
      binaries.set(name, path);
      return path;
    } catch {
    }
  }
  throw new Error(`\u672A\u627E\u5230 ${name}\u3002\u8BF7\u5B89\u88C5 FFmpeg\uFF08\u542B ffprobe / ffplay\uFF09\uFF0C\u6216\u8BBE\u7F6E MOYU_MEDIA_BIN \u6307\u5411\u5176 bin \u76EE\u5F55\u3002`);
}
async function nativeMediaPath(binary, path) {
  if (process.platform !== "win32" && binary.toLowerCase().endsWith(".exe")) return (await execute("wslpath", ["-w", path], { timeout: 5e3 })).stdout.trim();
  return path;
}
async function inspectVideo(input, cwd) {
  if (/^[a-z]+:\/\//i.test(input.trim())) throw new Error("\u9996\u7248\u652F\u6301\u672C\u5730\u89C6\u9891\uFF0C\u8BF7\u8F93\u5165\u6587\u4EF6\u8DEF\u5F84");
  const path = await realpath2(expandPath(input, cwd));
  const info = await stat2(path);
  if (!info.isFile() || !/\.(mp4|mkv|webm|mov|avi|m4v|mpeg|mpg|gif)$/i.test(path)) throw new Error("\u8BF7\u9009\u62E9 MP4\u3001MKV\u3001WebM\u3001MOV\u3001AVI \u6216 GIF \u89C6\u9891\u6587\u4EF6");
  const binary = await mediaBinary("ffprobe");
  const { stdout } = await execute(binary, ["-v", "error", "-protocol_whitelist", "file,pipe", "-show_entries", "stream=codec_type,width,height,sample_aspect_ratio:stream_tags=rotate:stream_side_data=rotation:format=duration", "-of", "json", await nativeMediaPath(binary, path)], { timeout: 15e3, maxBuffer: 256 * 1024, windowsHide: true });
  const data = JSON.parse(stdout), video = data.streams?.find((stream) => stream.codec_type === "video");
  if (!video?.width || !video.height) throw new Error("\u6587\u4EF6\u6CA1\u6709\u53EF\u64AD\u653E\u7684\u89C6\u9891\u8F68\u9053");
  const duration = Number(data.format?.duration);
  if (!Number.isFinite(duration) || duration <= 0) throw new Error("\u6682\u4E0D\u652F\u6301\u65E0\u6CD5\u786E\u5B9A\u65F6\u957F\u7684\u89C6\u9891");
  const sar = String(video.sample_aspect_ratio || "1:1").split(":").map(Number);
  let width = video.width * (sar[0] > 0 && sar[1] > 0 ? sar[0] / sar[1] : 1), height = video.height;
  const rotation = Number(video.side_data_list?.find((item) => item.rotation !== void 0)?.rotation ?? video.tags?.rotate ?? 0);
  if (Math.abs(rotation) % 180 === 90) [width, height] = [height, width];
  return { path, title: basename2(path, extname2(path)), width, height, duration, hasAudio: data.streams.some((stream) => stream.codec_type === "audio") };
}
function launchMedia(binary, args) {
  return spawn(binary, args, { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
}
function stopMedia(child) {
  if (!child || child.exitCode !== null || child.signalCode) return;
  child.kill("SIGTERM");
  const timer = setTimeout(() => {
    if (child.exitCode === null && !child.signalCode) child.kill("SIGKILL");
  }, 1e3);
  timer.unref?.();
  child.once("close", () => clearTimeout(timer));
}

// src/media/pixels.mjs
function pixelSize(width, height, columns, rows) {
  const maxWidth = Math.max(2, Math.min(160, Math.floor(columns)));
  const maxHeight = Math.max(2, Math.min(100, Math.floor(rows) * 2));
  const scale = Math.min(maxWidth / width, maxHeight / height);
  return { width: Math.max(2, Math.floor(width * scale)), height: Math.max(2, Math.floor(height * scale / 2) * 2) };
}
function pixelRuns(frame, width, height) {
  if (frame.length !== width * height * 3) throw new Error("\u89C6\u9891\u5E27\u957F\u5EA6\u5F02\u5E38");
  const runs = [];
  const color = (offset) => [0, 1, 2].map((i) => Math.round(frame[offset + i] / 51) * 51).join(",");
  for (let y = 0; y < height; y += 2) {
    let last;
    for (let x = 0; x < width; x++) {
      const fg = color((y * width + x) * 3), bg = color(((y + 1) * width + x) * 3);
      if (last?.fg === fg && last.bg === bg) last.text += "\u2580";
      else {
        last = { text: "\u2580", fg, bg };
        runs.push(last);
      }
    }
    if (y + 2 < height) runs.push({ text: "\n" });
  }
  return runs;
}
function mediaTime(seconds) {
  const value = Math.max(0, Math.floor(Number(seconds) || 0));
  const hours = Math.floor(value / 3600);
  return (hours ? hours + ":" : "") + [Math.floor(value / 60) % 60, value % 60].map((n) => String(n).padStart(2, "0")).join(":");
}

// src/media/player.mjs
var PixelPlayer = class {
  constructor({ onFrame = (_frame, _size) => {
  }, onState = (_state) => {
  }, onError = (_error) => {
  }, binary = mediaBinary, launch = launchMedia, frameSize = pixelSize } = {}) {
    this.onFrame = onFrame;
    this.onState = onState;
    this.onError = onError;
    this.binary = binary;
    this.launch = launch;
    this.generation = 0;
    this.position = 0;
    this.playing = false;
    this.muted = true;
    this.fps = 10;
    this.columns = 36;
    this.rows = 16;
    this.disposed = false;
    this.frameSize = frameSize;
    this.scaleFilter = "neighbor";
  }
  emit() {
    this.onState({ position: this.position, playing: this.playing, muted: this.muted, loading: this.loading || false });
  }
  load(video, position = 0) {
    this.stop();
    this.video = video;
    const saved = Number(position) || 0;
    this.position = saved >= video.duration - 0.05 ? 0 : Math.max(0, saved);
    this.muted = true;
    this.emit();
    return this.start(false);
  }
  resize(columns, rows) {
    if (columns === this.columns && rows === this.rows) return;
    this.columns = columns;
    this.rows = rows;
    if (this.video) return this.start(this.playing);
  }
  stop() {
    ++this.generation;
    clearTimeout(this.timer);
    stopMedia(this.decoder);
    stopMedia(this.audio);
    this.decoder = void 0;
    this.audio = void 0;
    this.loading = false;
  }
  pause() {
    this.stop();
    this.playing = false;
    this.emit();
  }
  play() {
    if (this.position >= (this.video?.duration || Infinity) - 0.05) this.position = 0;
    return this.start(true);
  }
  seek(seconds) {
    if (!this.video) return;
    this.position = Math.max(0, Math.min(this.video.duration - 0.05, Number(seconds) || 0));
    return this.start(this.playing);
  }
  async setMuted(muted) {
    if (muted === this.muted || !this.video) return;
    const token = this.generation;
    if (!muted && !this.video.hasAudio) throw new Error("\u8FD9\u4E2A\u89C6\u9891\u6CA1\u6709\u97F3\u8F68");
    if (!muted) await this.binary("ffplay");
    if (this.disposed || token !== this.generation) return;
    this.muted = muted;
    if (this.playing) await this.start(true);
    else this.emit();
  }
  async start(playing) {
    this.stop();
    if (!this.video || this.disposed) return;
    const token = this.generation, video = this.video, start = this.position;
    this.playing = playing;
    this.loading = true;
    this.emit();
    try {
      const binary = await this.binary("ffmpeg"), path = await nativeMediaPath(binary, video.path);
      if (token !== this.generation || this.disposed) return;
      const size = this.frameSize(video.width, video.height, this.columns, this.rows), frameBytes = size.width * size.height * 3;
      const args = ["-nostdin", "-hide_banner", "-loglevel", "error", "-threads", "1", "-filter_threads", "1", "-protocol_whitelist", "file,pipe", "-ss", String(start), "-i", path, "-map", "0:v:0", "-an", "-sn", "-vf", `fps=${this.fps},scale=${size.width}:${size.height}:flags=${this.scaleFilter},setsar=1`, ...!playing ? ["-frames:v", "1"] : [], "-pix_fmt", "rgb24", "-f", "rawvideo", "pipe:1"];
      const child = this.decoder = this.launch(binary, args);
      let buffer = Buffer.alloc(0), stderr = "", ended = false, exitCode, frames = 0, audioStarted = false, lastFrameAt = Date.now();
      let nextFrameAt;
      const valid = () => token === this.generation && !this.disposed;
      const fail = (error) => {
        if (!valid()) return;
        this.pause();
        this.onError(error instanceof Error ? error.message : String(error));
      };
      child.stderr.on("data", (chunk) => {
        stderr = (stderr + chunk.toString()).slice(-1500);
      });
      child.on("error", fail);
      child.stdout.on("data", (chunk) => {
        if (!valid()) return;
        buffer = buffer.length ? Buffer.concat([buffer, chunk]) : chunk;
        if (buffer.length >= frameBytes * 3) child.stdout.pause();
      });
      child.on("close", (code) => {
        ended = true;
        exitCode = code;
        if (code && valid()) fail(new Error(`\u89C6\u9891\u89E3\u7801\u5931\u8D25\uFF1A${stderr || code}`));
      });
      const tick = () => {
        if (!valid()) return;
        if (buffer.length >= frameBytes) {
          lastFrameAt = Date.now();
          nextFrameAt = (nextFrameAt ?? lastFrameAt) + 1e3 / this.fps;
          const frame = buffer.subarray(0, frameBytes);
          buffer = buffer.subarray(frameBytes);
          this.loading = false;
          this.position = Math.min(video.duration, start + frames++ / this.fps);
          this.onFrame(frame, size);
          this.emit();
          if (!audioStarted && playing && !this.muted) {
            audioStarted = true;
            void this.startAudio(video, start, token);
          }
          if (buffer.length < frameBytes * 3) child.stdout.resume();
          if (!playing) {
            this.stop();
            return;
          }
        } else if (ended) {
          if (!frames && exitCode === 0) return fail(new Error("\u6CA1\u6709\u89E3\u7801\u51FA\u89C6\u9891\u5E27"));
          this.position = video.duration;
          this.pause();
          return;
        } else if (Date.now() - lastFrameAt > 2e4) return fail(new Error("\u89C6\u9891\u89E3\u7801\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6216\u91CD\u65B0\u6253\u5F00"));
        this.timer = setTimeout(tick, frames ? Math.max(buffer.length >= frameBytes ? 1 : 10, nextFrameAt - Date.now()) : 20);
      };
      tick();
    } catch (error) {
      if (token !== this.generation || this.disposed) return;
      this.pause();
      this.onError(error instanceof Error ? error.message : String(error));
    }
  }
  async startAudio(video, position, token) {
    try {
      const binary = await this.binary("ffplay"), path = await nativeMediaPath(binary, video.path);
      if (token !== this.generation || this.disposed || this.muted) return;
      const child = this.audio = this.launch(binary, ["-hide_banner", "-loglevel", "error", "-nodisp", "-vn", "-sn", "-autoexit", "-volume", "70", "-ss", String(position), "-protocol_whitelist", "file,pipe", "-i", path]);
      let stderr = "";
      child.stdout.resume();
      child.stderr.on("data", (chunk) => {
        stderr = (stderr + chunk.toString()).slice(-600);
      });
      const failed = (reason) => {
        if (token !== this.generation || this.disposed) return;
        this.muted = true;
        this.emit();
        this.onError(`\u58F0\u97F3\u64AD\u653E\u5931\u8D25\uFF0C\u5DF2\u6062\u590D\u9759\u97F3\uFF1A${reason}`);
      };
      child.on("error", (error) => failed(error.message));
      child.on("close", (code) => {
        if (code) failed(stderr || String(code));
      });
    } catch (error) {
      if (token !== this.generation || this.disposed) return;
      this.muted = true;
      this.emit();
      this.onError(String(error));
    }
  }
  dispose() {
    this.stop();
    this.playing = false;
    this.disposed = true;
  }
};

// src/media/inline-image.mjs
function imageProtocol(core, renderer) {
  if (typeof core.ImageRenderable !== "function" || typeof core.NativeImage?.fromRgba !== "function") return "legacy";
  const caps = renderer.capabilities || {};
  const requested = caps.image_protocol || "auto";
  if (typeof core.resolveImageRenderProtocol === "function") return core.resolveImageRenderProtocol(requested, caps, Boolean(renderer.resolution));
  if (requested === "blocks" || caps.multiplexer && caps.multiplexer !== "none") return "blocks";
  if (caps.kitty_graphics) return "kitty";
  return caps.sixel && renderer.resolution ? "sixel" : "blocks";
}
function imageFrameSize(width, height, columns, rows, renderer, protocol) {
  const cellWidth = renderer.resolution?.width / renderer.width || 8;
  const cellHeight = renderer.resolution?.height / renderer.height || 16;
  const maxWidth = Math.min(1280, Math.max(2, columns * (protocol === "blocks" ? 4 : cellWidth)));
  const maxHeight = Math.min(1280, Math.max(2, rows * (protocol === "blocks" ? 8 : cellHeight)));
  const scale = Math.min(1, maxWidth / width, maxHeight / height, Math.sqrt(921600 / (width * height)));
  return { width: Math.max(2, Math.floor(width * scale / 2) * 2), height: Math.max(2, Math.floor(height * scale / 2) * 2) };
}
var InlineImage = class {
  constructor(core, renderer, onError = (_error) => {
  }) {
    this.core = core;
    this.renderer = renderer;
    this.onError = onError;
  }
  mount(container) {
    this.unmount();
    try {
      this.node = new this.core.ImageRenderable(this.renderer, { id: "moyu-video-image", width: "100%", height: "100%", fit: "fit", protocol: "auto", onError: this.onError });
      container.add(this.node);
      if (this.last) this.draw(this.last.bytes, this.last.size);
    } catch (error) {
      this.onError(error);
    }
  }
  present(bytes, size) {
    this.last = { bytes: Buffer.from(bytes), size };
    if (this.node && !this.node.isDestroyed) {
      try {
        this.draw(bytes, size);
      } catch (error) {
        this.onError(error);
      }
    }
  }
  draw(bytes, size) {
    if (bytes.length !== size.width * size.height * 3) throw new Error("\u539F\u753B\u5E27\u957F\u5EA6\u5F02\u5E38");
    const rgba = Buffer.allocUnsafe(size.width * size.height * 4);
    for (let source = 0, target = 0; source < bytes.length; source += 3, target += 4) {
      rgba[target] = bytes[source];
      rgba[target + 1] = bytes[source + 1];
      rgba[target + 2] = bytes[source + 2];
      rgba[target + 3] = 255;
    }
    const image = this.core.NativeImage.fromRgba(rgba, size.width, size.height, size.width * 4, { owner: this.renderer.nativeScene?.resourceContext });
    try {
      this.node.source = image;
    } finally {
      image.dispose();
    }
  }
  clear() {
    this.last = void 0;
    if (this.node && !this.node.isDestroyed) this.node.source = void 0;
  }
  unmount() {
    if (this.node && !this.node.isDestroyed) this.node.destroy();
    this.node = void 0;
  }
  dispose() {
    this.clear();
    this.unmount();
  }
};

// src/sources/local-video.mjs
async function addLocalVideo(library, input, cwd) {
  const media = await inspectVideo(input, cwd);
  media.title = cleanText(media.title);
  const id = stableId("local-video:" + media.path);
  await library.putResource({ schemaVersion: 1, id, kind: "video", title: media.title, source: { adapter: "local-video", url: media.path }, assets: [{ role: "media", mime: "video/*", path: media.path }], metadata: { ...media, originalFile: true }, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
  return { ...media, id };
}
async function resolveLocalVideo(resource) {
  if (resource.kind !== "video" || resource.source.adapter !== "local-video") throw new Error("\u6682\u4E0D\u652F\u6301\u8FD9\u4E2A\u89C6\u9891\u6765\u6E90");
  const path = resource.assets.find((asset) => asset.role === "media")?.path;
  if (!path) throw new Error("\u89C6\u9891\u8BB0\u5F55\u6CA1\u6709\u672C\u5730\u6587\u4EF6\u8DEF\u5F84");
  return { ...await inspectVideo(path), id: resource.id, title: resource.title };
}

// src/services/video-ingestion.mjs
import { spawn as spawn2, execFile as execFile2 } from "node:child_process";
import { access as access2, mkdir as mkdir5, mkdtemp, readdir as readdir5, stat as stat4, rm as rm3 } from "node:fs/promises";
import { join as join5, delimiter as delimiter2, dirname as dirname3, extname as extname3 } from "node:path";
import { homedir as homedir3 } from "node:os";
import { constants as constants2 } from "node:fs";
import { promisify as promisify2 } from "node:util";

// src/media/settings.mjs
import { readFile as readFile4, unlink as unlink2, mkdir as mkdir3 } from "node:fs/promises";
import { join as join3 } from "node:path";
var MediaSettings = class {
  constructor(library) {
    this.library = library;
    this.path = join3(library.internal, "settings", "youtube.enc");
  }
  async key() {
    try {
      return (await this.library.vault.unseal(await readFile4(this.path))).apiKey || "";
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    return process.env.YOUTUBE_API_KEY || "";
  }
  async status() {
    return { youtubeApiKeyConfigured: Boolean(await this.key()) };
  }
  async saveKey(input) {
    const apiKey = input.trim();
    if (!/^[A-Za-z0-9_-]{20,200}$/.test(apiKey)) throw new Error("API Key \u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u8BF7\u7C98\u8D34\u5B8C\u6574\u5BC6\u94A5");
    await mkdir3(join3(this.library.internal, "settings"), { recursive: true, mode: 448 });
    await atomicWrite(this.path, await this.library.vault.seal({ apiKey }));
    return this.status();
  }
  async removeKey() {
    await unlink2(this.path).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
    return this.status();
  }
};

// src/media/cache.mjs
import { createCipheriv as createCipheriv2, createDecipheriv as createDecipheriv2, randomBytes as randomBytes2, randomUUID as randomUUID2 } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir as mkdir4, open as open2, readdir as readdir4, writeFile as writeFile3, rename as rename2, rm as rm2, stat as stat3 } from "node:fs/promises";
import { join as join4 } from "node:path";
import { pipeline } from "node:stream/promises";
var magic2 = Buffer.from("MOYUVID1");
var aad2 = Buffer.from("opencode-moyu:video:v1");
var MAX_VIDEO_BYTES = 256 * 1024 * 1024;
var MediaCache = class {
  constructor(library) {
    this.library = library;
    this.directory = join4(library.internal, "media");
    this.playback = join4(library.internal, "playback");
  }
  path(id) {
    if (!/^[a-f0-9]{24}$/.test(id)) throw new Error("\u65E0\u6548\u89C6\u9891 ID");
    return join4(this.directory, id + ".moyuvid");
  }
  async seal(id, source) {
    const size = (await stat3(source)).size;
    if (size > MAX_VIDEO_BYTES) throw new Error("\u89C6\u9891\u8D85\u8FC7 256 MiB \u9650\u5236");
    await mkdir4(this.directory, { recursive: true, mode: 448 });
    const target = this.path(id), temporary = target + "." + randomUUID2() + ".tmp";
    const nonce = randomBytes2(12), cipher = createCipheriv2("aes-256-gcm", await this.library.vault.key(), nonce);
    cipher.setAAD(aad2);
    try {
      await writeFile3(temporary, Buffer.concat([magic2, nonce, Buffer.alloc(16)]), { flag: "wx", mode: 384 });
      await pipeline(createReadStream(source), cipher, createWriteStream(temporary, { flags: "a" }));
      const file = await open2(temporary, "r+");
      try {
        await file.write(cipher.getAuthTag(), 0, 16, 20);
      } finally {
        await file.close();
      }
      await rename2(temporary, target);
      return target;
    } finally {
      await rm2(temporary, { force: true });
    }
  }
  async removeStalePlayback() {
    await mkdir4(this.playback, { recursive: true, mode: 448 });
    for (const entry of await readdir4(this.playback, { withFileTypes: true })) {
      if (!entry.isDirectory() || !/^\d+-[a-f0-9-]{36}$/.test(entry.name)) continue;
      const pid = Number(entry.name.split("-")[0]);
      try {
        process.kill(pid, 0);
      } catch (error) {
        if (error.code === "ESRCH") await rm2(join4(this.playback, entry.name), { recursive: true, force: true });
      }
    }
  }
  async open(resource) {
    if (resource.source.adapter === "local-video") return resolveLocalVideo(resource);
    if (resource.kind !== "video" || !resource.metadata.managedMedia) throw new Error("\u89C6\u9891\u5C1A\u672A\u4E0B\u8F7D\uFF0C\u8BF7\u5148\u4ECE\u6765\u6E90\u5BFC\u5165");
    const path = this.path(resource.id), info = await stat3(path);
    if (info.size > MAX_VIDEO_BYTES + 36 || info.size < 36) throw new Error("\u89C6\u9891\u7F13\u5B58\u5927\u5C0F\u5F02\u5E38");
    const file = await open2(path, "r"), header = Buffer.alloc(36);
    try {
      await file.read(header, 0, 36, 0);
    } finally {
      await file.close();
    }
    if (!header.subarray(0, 8).equals(magic2)) throw new Error("\u89C6\u9891\u7F13\u5B58\u683C\u5F0F\u4E0D\u652F\u6301");
    await this.removeStalePlayback();
    const temporary = join4(this.playback, process.pid + "-" + randomUUID2());
    await mkdir4(temporary, { mode: 448 });
    const extension = /^\.(mp4|mkv|webm|mov|avi|m4v|mpeg|mpg|gif)$/.test(resource.metadata.extension || "") ? resource.metadata.extension : ".mp4";
    const decoded = join4(temporary, "video" + extension);
    const release = () => rm2(temporary, { recursive: true, force: true, maxRetries: 4, retryDelay: 200 });
    try {
      const decipher = createDecipheriv2("aes-256-gcm", await this.library.vault.key(false), header.subarray(8, 20));
      decipher.setAAD(aad2);
      decipher.setAuthTag(header.subarray(20, 36));
      await pipeline(createReadStream(path, { start: 36 }), decipher, createWriteStream(decoded, { flags: "wx", mode: 384 }));
      return { ...await inspectVideo(decoded), id: resource.id, title: resource.title, release };
    } catch {
      await release();
      throw new Error("\u89C6\u9891\u7F13\u5B58\u65E0\u6CD5\u89E3\u5BC6\u6216\u64AD\u653E\uFF0C\u8BF7\u68C0\u67E5\u5BC6\u94A5\u53CA\u6587\u4EF6\u5B8C\u6574\u6027\u540E\u91CD\u65B0\u4E0B\u8F7D");
    }
  }
};

// src/core/http.mjs
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import http from "node:http";
import https from "node:https";
import { createGunzip, createBrotliDecompress, createInflate } from "node:zlib";
var import_https_proxy_agent = __toESM(require_dist2(), 1);
function isPublicAddress(address) {
  const value = address.toLowerCase().replace(/^\[|\]$/g, "");
  if (isIP(value) === 4) {
    const [a, b] = value.split(".").map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || a === 100 && b >= 64 && b <= 127 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && (b === 168 || b === 0) || a === 198 && (b === 18 || b === 19));
  }
  return isIP(value) === 6 && /^[23][0-9a-f]{0,3}:/.test(value);
}
function httpUrl(input) {
  const url = new URL(input);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("\u6765\u6E90\u53EA\u652F\u6301\u4E0D\u5E26\u767B\u5F55\u51ED\u636E\u7684 HTTP(S) \u5730\u5740");
  url.hash = "";
  return url;
}
function createHttpClient({ allowPrivate = false, maxBytes = 2 * 1024 * 1024, timeoutMs = 15e3, useProxy = true, maxRedirects = 4 } = {}) {
  return async function readPage(input, { signal, headers = {} } = {}) {
    let url = httpUrl(input);
    const initialOrigin = url.origin;
    for (let redirects = 0; redirects <= maxRedirects; redirects++) {
      signal?.throwIfAborted();
      const hostname = url.hostname.replace(/^\[|\]$/g, "");
      const addresses = isIP(hostname) ? [{ address: hostname, family: isIP(hostname) }] : await lookup(hostname, { all: true });
      if (!addresses.length || !allowPrivate && addresses.some((item) => !isPublicAddress(item.address))) throw new Error("\u6765\u6E90\u4E0D\u80FD\u6307\u5411\u672C\u673A\u3001\u5C40\u57DF\u7F51\u6216\u4FDD\u7559\u7F51\u7EDC\u5730\u5740");
      const pinned = addresses[0];
      const bypass = (process.env.NO_PROXY || process.env.no_proxy || "").split(/[,\s]+/).filter(Boolean).some((value) => {
        if (value === "*") return true;
        const [host, port] = value.toLowerCase().split(":");
        if (port && port !== (url.port || (url.protocol === "https:" ? "443" : "80"))) return false;
        const suffix = host.replace(/^\*?\./, "");
        return hostname === suffix || hostname.endsWith("." + suffix);
      });
      const proxy = !useProxy || bypass ? void 0 : url.protocol === "https:" ? process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy : process.env.HTTP_PROXY || process.env.http_proxy;
      const agent = proxy ? new import_https_proxy_agent.HttpsProxyAgent(proxy) : void 0;
      const result = await new Promise((resolve4, reject) => {
        const request = (url.protocol === "https:" ? https : http).get(url, {
          signal,
          agent,
          lookup: (_host, options, callback) => options?.all ? callback(null, [pinned]) : callback(null, pinned.address, pinned.family),
          headers: { "User-Agent": "OpenCode-Moyu/0.4.0 (+local reading library)", Accept: "text/html,text/plain;q=0.9", "Accept-Encoding": "gzip, br, deflate", ...url.origin === initialOrigin ? headers : {} }
        }, async (response) => {
          try {
            const status = response.statusCode ?? 0;
            if ([301, 302, 303, 307, 308].includes(status) && response.headers.location) {
              response.resume();
              resolve4({ redirect: response.headers.location });
              return;
            }
            if (status < 200 || status >= 300) {
              response.resume();
              throw new Error(`\u6765\u6E90\u8FD4\u56DE HTTP ${status}\uFF1B\u505C\u6B62\u6293\u53D6`);
            }
            const contentType = String(response.headers["content-type"] ?? "text/html");
            if (!/^(text\/|application\/(xhtml\+xml|xml|json))/i.test(contentType)) {
              response.resume();
              throw new Error(`\u5F53\u524D\u6587\u5B57\u6765\u6E90\u4E0D\u652F\u6301\uFF1A${contentType}`);
            }
            const encoding = response.headers["content-encoding"];
            const stream = encoding === "gzip" ? response.pipe(createGunzip()) : encoding === "br" ? response.pipe(createBrotliDecompress()) : encoding === "deflate" ? response.pipe(createInflate()) : response;
            const chunks = [];
            let size = 0;
            for await (const chunk of stream) {
              size += chunk.length;
              if (size > maxBytes) {
                request.destroy();
                throw new Error("\u6765\u6E90\u9875\u9762\u8D85\u8FC7\u5927\u5C0F\u9650\u5236");
              }
              chunks.push(chunk);
            }
            const bytes = Buffer.concat(chunks);
            const declared = contentType.match(/charset\s*=\s*["']?([^\s;"']+)/i)?.[1] ?? bytes.subarray(0, 4096).toString("latin1").match(/charset\s*=\s*["']?([\w-]+)/i)?.[1];
            const text = declared ? new TextDecoder(declared).decode(bytes) : decodeBook(bytes);
            resolve4({ url: url.href, text, contentType });
          } catch (error) {
            reject(error);
          }
        });
        request.setTimeout(timeoutMs, () => request.destroy(new Error("\u6765\u6E90\u8BF7\u6C42\u8D85\u65F6")));
        const deadline = setTimeout(() => request.destroy(new Error("\u6765\u6E90\u8BF7\u6C42\u8D85\u8FC7\u603B\u65F6\u9650")), timeoutMs);
        request.on("close", () => clearTimeout(deadline));
        request.on("error", reject);
      });
      if (result.redirect) {
        url = httpUrl(new URL(result.redirect, url).href);
        continue;
      }
      return result;
    }
    throw new Error("\u6765\u6E90\u91CD\u5B9A\u5411\u6B21\u6570\u8FC7\u591A");
  };
}

// src/sources/video-platforms.mjs
var short = (value, max = 180) => cleanText(String(value ?? "").replace(/<[^>]*>/g, "")).slice(0, max);
function videoUrl(input) {
  const value = input.trim();
  if (/^BV[\da-zA-Z]{10}$/.test(value)) return { platform: "bilibili", id: value, url: `https://www.bilibili.com/video/${value}/` };
  if (/^[\w-]{11}$/.test(value)) return { platform: "youtube", id: value, url: `https://www.youtube.com/watch?v=${value}` };
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("\u8BF7\u8F93\u5165 B \u7AD9 BV \u53F7\u6216\u5B8C\u6574\u89C6\u9891\u94FE\u63A5 / YouTube \u89C6\u9891\u94FE\u63A5");
  }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.port) throw new Error("\u89C6\u9891\u94FE\u63A5\u683C\u5F0F\u4E0D\u652F\u6301");
  const host = url.hostname.toLowerCase();
  if (["www.bilibili.com", "bilibili.com", "m.bilibili.com"].includes(host)) {
    const id = url.pathname.match(/^\/video\/(BV[\da-zA-Z]{10}|av\d+)(?:\/|$)/)?.[1];
    if (id) {
      const page = Math.max(1, Math.min(1e3, Number(url.searchParams.get("p")) || 1));
      return { platform: "bilibili", id, page, url: `https://www.bilibili.com/video/${id}/${page > 1 ? "?p=" + Math.floor(page) : ""}` };
    }
  }
  if (["www.youtube.com", "youtube.com", "m.youtube.com", "youtu.be"].includes(host)) {
    const id = host === "youtu.be" ? url.pathname.slice(1) : url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1];
    if (id && /^[\w-]{11}$/.test(id)) return { platform: "youtube", id, url: `https://www.youtube.com/watch?v=${id}` };
  }
  throw new Error("\u4EC5\u652F\u6301 B \u7AD9\u5355\u4E2A\u89C6\u9891\u548C YouTube \u5355\u4E2A\u89C6\u9891\u94FE\u63A5\uFF1B\u77ED\u94FE\u63A5\u8BF7\u5148\u590D\u5236\u5B8C\u6574\u5730\u5740");
}
function createVideoPlatforms({ settings, read = createHttpClient({ maxBytes: 1024 * 1024, maxRedirects: 0 }) }) {
  async function youtube(path, params, signal) {
    const key = await settings.key();
    if (!key) throw new Error("\u8BF7\u5148\u5728\u300C\u89C6\u9891\u6765\u6E90\u8BBE\u7F6E\u300D\u586B\u5199 YouTube API Key");
    const url = new URL("https://www.googleapis.com/youtube/v3/" + path);
    for (const [name, value] of Object.entries(params)) url.searchParams.set(name, String(value));
    try {
      const result = await read(url.href, { signal, headers: { Accept: "application/json", "X-Goog-Api-Key": key } });
      const data = JSON.parse(result.text);
      if (data.error) throw new Error("API_ERROR");
      return data;
    } catch (error) {
      if (signal?.aborted) throw error;
      const code = String(error).match(/HTTP\s+(\d{3})/)?.[1];
      throw new Error(`YouTube API \u8BF7\u6C42\u5931\u8D25${code ? "\uFF08HTTP " + code + "\uFF09" : ""}\uFF0C\u8BF7\u68C0\u67E5 API Key\u3001YouTube Data API v3 \u662F\u5426\u542F\u7528\u3001\u914D\u989D\u548C\u7F51\u7EDC\u3002`);
    }
  }
  async function bili(path, params, signal) {
    const url = new URL("https://api.bilibili.com" + path);
    for (const [name, value] of Object.entries(params)) url.searchParams.set(name, String(value));
    const result = await read(url.href, { signal, headers: { Accept: "application/json", Referer: "https://www.bilibili.com/" } });
    const data = JSON.parse(result.text);
    if (data.code !== 0) throw new Error(`B \u7AD9\u63A5\u53E3\u8FD4\u56DE ${Number(data.code)}\uFF0C\u5F53\u524D\u6765\u6E90\u4E0D\u53EF\u7528\uFF1B\u8BF7\u68C0\u67E5\u94FE\u63A5\u6216\u7A0D\u540E\u91CD\u8BD5`);
    return data.data;
  }
  async function search({ platform, query, limit = 5, signal }) {
    query = String(query).trim().slice(0, 200);
    if (!query) throw new Error("\u8BF7\u8F93\u5165\u89C6\u9891\u5173\u952E\u8BCD");
    limit = Math.max(1, Math.min(5, Math.floor(Number(limit) || 5)));
    if (platform === "youtube") {
      const data2 = await youtube("search", { part: "snippet", type: "video", q: query, maxResults: limit, fields: "items(id/videoId,snippet(title,channelTitle,description))" }, signal);
      return (data2.items || []).filter((item) => /^[\w-]{11}$/.test(item.id?.videoId)).map((item) => ({ platform, id: item.id.videoId, url: `https://www.youtube.com/watch?v=${item.id.videoId}`, title: short(item.snippet.title), author: short(item.snippet.channelTitle, 80), description: short(item.snippet.description, 200) })).slice(0, limit);
    }
    if (platform !== "bilibili") throw new Error("\u672A\u77E5\u89C6\u9891\u6765\u6E90");
    const data = await bili("/x/web-interface/search/type", { search_type: "video", keyword: query, page: 1, page_size: limit }, signal);
    return (data.result || []).filter((item) => /^BV[\da-zA-Z]{10}$/.test(item.bvid)).slice(0, limit).map((item) => ({ platform, id: item.bvid, url: `https://www.bilibili.com/video/${item.bvid}/`, title: short(item.title), author: short(item.author, 80), description: short(item.description, 200), duration: short(item.duration, 20) }));
  }
  async function info(input, { signal } = {}) {
    const target = videoUrl(input);
    if (target.platform === "youtube") {
      const data2 = await youtube("videos", { part: "snippet,contentDetails,statistics", id: target.id, fields: "items(id,snippet(title,channelTitle,description),contentDetails/duration,statistics/viewCount)" }, signal);
      const item = data2.items?.[0];
      if (!item) throw new Error("YouTube \u672A\u8FD4\u56DE\u8FD9\u4E2A\u89C6\u9891\uFF0C\u53EF\u80FD\u5DF2\u5220\u9664\u3001\u975E\u516C\u5F00\u6216\u4E0D\u53EF\u8BBF\u95EE");
      return { ...target, title: short(item.snippet.title), author: short(item.snippet.channelTitle, 80), description: short(item.snippet.description, 600), duration: short(item.contentDetails?.duration, 40), views: Number(item.statistics?.viewCount) || 0 };
    }
    const data = await bili("/x/web-interface/view", target.id.startsWith("av") ? { aid: target.id.slice(2) } : { bvid: target.id }, signal);
    return { ...target, title: short(data.title), author: short(data.owner?.name, 80), description: short(data.desc, 600), duration: Number(data.duration) || 0, views: Number(data.stat?.view) || 0 };
  }
  async function popular({ page = 1, signal } = {}) {
    page = Math.max(1, Math.min(100, Math.floor(Number(page) || 1)));
    const data = await bili("/x/web-interface/popular", { pn: page, ps: 10 }, signal);
    const items = (data.list || []).filter((item) => /^BV[\da-zA-Z]{10}$/.test(item.bvid)).slice(0, 10).map((item) => ({
      platform: "bilibili",
      id: item.bvid,
      url: `https://www.bilibili.com/video/${item.bvid}/`,
      title: short(item.title),
      author: short(item.owner?.name, 80),
      duration: Number(item.duration) || 0
    }));
    return { items, page, hasMore: !data.no_more && items.length > 0 && page < 100 };
  }
  return { search, info, popular, list: () => [{ id: "bilibili", name: "\u54D4\u54E9\u54D4\u54E9", search: true, apiKey: false }, { id: "youtube", name: "YouTube", search: true, apiKey: true }] };
}

// src/services/video-ingestion.mjs
var execute2 = promisify2(execFile2);
var VIDEO_FORMAT_ARGS = Object.freeze(["--format", "bv*+ba/bv*", "--format-sort", "res:480,vcodec:h264,acodec:m4a"]);
async function downloaderBinary() {
  const paths = process.env.MOYU_YTDLP ? [process.env.MOYU_YTDLP] : [
    join5(homedir3(), ".local/share/opencode-moyu/media/bin", process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp"),
    ...String(process.env.PATH || "").split(delimiter2).map((dir) => join5(dir, process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp"))
  ];
  for (const path of paths) {
    try {
      await access2(path, constants2.X_OK);
      await execute2(path, ["--version"], { timeout: 5e3, maxBuffer: 1024, windowsHide: true });
      return path;
    } catch {
    }
  }
  throw new Error("\u672A\u627E\u5230 yt-dlp\uFF0C\u8BF7\u5B89\u88C5\u5B98\u65B9 yt-dlp\uFF0C\u6216\u7528 MOYU_YTDLP \u6307\u5B9A\u8DEF\u5F84");
}
function safeError(message) {
  return cleanText(String(message)).replace(/https?:\/\/\S+/g, "[\u6765\u6E90\u5730\u5740]").slice(-600);
}
function downloadFailure(message, platform) {
  if (/sign in to confirm|not a bot|captcha|human.verification|verify.you.are.human/i.test(message)) return `${platform === "youtube" ? "YouTube" : "\u89C6\u9891\u6765\u6E90"} \u8981\u6C42\u767B\u5F55\u6216\u4EBA\u673A\u9A8C\u8BC1\uFF0C\u5DF2\u505C\u6B62\u4E0B\u8F7D\u3002API Key \u4EC5\u7528\u4E8E\u6570\u636E\u67E5\u8BE2\uFF0C\u4E0D\u80FD\u89E3\u9664\u89C6\u9891\u8BBF\u95EE\u9650\u5236\u3002`;
  if (/private video|members.only|premium|age.restricted|login required|sign in/i.test(message)) return "\u89C6\u9891\u9700\u8981\u8D26\u6237\u6216\u989D\u5916\u8BBF\u95EE\u6743\u9650\uFF0C\u5DF2\u505C\u6B62\u4E0B\u8F7D";
  if (/video is unavailable|video unavailable|removed|does not exist/i.test(message)) return "\u89C6\u9891\u4E0D\u53EF\u7528\u3001\u5DF2\u5220\u9664\u6216\u5F53\u524D\u7F51\u7EDC\u65E0\u6CD5\u8BBF\u95EE\uFF0C\u672A\u5165\u5E93";
  if (/requested format is not available/i.test(message)) return "\u6765\u6E90\u672A\u63D0\u4F9B\u5F53\u524D\u53EF\u4E0B\u8F7D\u7684\u89C6\u9891\u683C\u5F0F\uFF0C\u672A\u5165\u5E93";
  return "\u89C6\u9891\u6765\u6E90\u83B7\u53D6\u5931\u8D25\uFF1A" + safeError(message);
}
async function downloadVideo(url, directory, { signal, onProgress = (_value) => {
}, binary = downloaderBinary, launch = spawn2 } = {}) {
  const target = videoUrl(url);
  signal?.throwIfAborted();
  const executable = await binary(), ffmpeg = await mediaBinary("ffmpeg");
  signal?.throwIfAborted();
  const args = ["--ignore-config", "--no-plugin-dirs", "--no-cache-dir", "--no-playlist", "--playlist-items", "1", "--no-remote-components", "--js-runtimes", "node", "--socket-timeout", "15", "--retries", "0", "--extractor-retries", "0", "--fragment-retries", "0", "--abort-on-unavailable-fragments", "--concurrent-fragments", "1", "--match-filters", "!is_live & duration <= 3600", "--max-filesize", String(MAX_VIDEO_BYTES), ...VIDEO_FORMAT_ARGS, "--merge-output-format", "mp4/mkv", "--ffmpeg-location", dirname3(ffmpeg), "--no-mtime", "--newline", "--progress", "--progress-template", "download:MOYU_PROGRESS:%(progress._percent_str)s", "--print", "before_dl:MOYU_META:%(title)j", "--no-simulate", "--paths", directory, "--output", "video.%(ext)s", "--", target.url];
  return new Promise((resolve4, reject) => {
    const child = launch(executable, args, { stdio: ["ignore", "pipe", "pipe"], windowsHide: true, detached: process.platform !== "win32" });
    let stderr = "", partial = "", title = "", failure, finished = false;
    const terminate = (error) => {
      if (finished || failure) return;
      failure = error;
      try {
        if (process.platform !== "win32") process.kill(-child.pid, "SIGTERM");
        else spawn2("taskkill", ["/pid", String(child.pid), "/t", "/f"], { stdio: "ignore", windowsHide: true }).once("error", () => child.kill());
      } catch {
      }
      const timer = setTimeout(() => {
        try {
          if (process.platform !== "win32") process.kill(-child.pid, "SIGKILL");
          else child.kill("SIGKILL");
        } catch {
        }
      }, 1500);
      timer.unref?.();
      child.once("close", () => clearTimeout(timer));
    };
    const abort = () => terminate(new Error("\u89C6\u9891\u4E0B\u8F7D\u5DF2\u53D6\u6D88"));
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
    child.stdout.on("data", (chunk) => {
      partial += chunk.toString();
      if (partial.length > 8192) partial = partial.slice(-8192);
      const lines = partial.split(/\r?\n/);
      partial = lines.pop() || "";
      for (const line of lines) {
        if (line.startsWith("MOYU_META:")) {
          try {
            title = cleanText(JSON.parse(line.slice(10))).slice(0, 180);
          } catch {
          }
        }
        const match = line.match(/MOYU_PROGRESS:\s*([\d.]+)%/);
        if (match) onProgress({ percent: Math.min(99, Number(match[1])), phase: "downloading" });
      }
    });
    child.stderr.on("data", (chunk) => {
      stderr = (stderr + chunk.toString()).slice(-4e3);
    });
    const deadline = setTimeout(() => terminate(new Error("\u89C6\u9891\u4E0B\u8F7D\u8D85\u8FC7 10 \u5206\u949F\uFF0C\u5DF2\u505C\u6B62")), 6e5);
    let checking = false;
    const quota = setInterval(async () => {
      if (checking || finished) return;
      checking = true;
      try {
        const files = await readdir5(directory);
        const sizes = await Promise.all(files.map((name) => stat4(join5(directory, name)).then((item) => item.size).catch(() => 0)));
        if (sizes.reduce((sum, size) => sum + size, 0) > MAX_VIDEO_BYTES * 2) terminate(new Error("\u89C6\u9891\u4E0B\u8F7D\u4E34\u65F6\u6587\u4EF6\u8D85\u8FC7 512 MiB \u9650\u5236"));
      } catch (error) {
        if (!finished) terminate(new Error("\u65E0\u6CD5\u68C0\u67E5\u4E0B\u8F7D\u7F13\u5B58\uFF1A" + safeError(error.message)));
      } finally {
        checking = false;
      }
    }, 500);
    const clean = () => {
      finished = true;
      clearTimeout(deadline);
      clearInterval(quota);
      signal?.removeEventListener("abort", abort);
    };
    child.once("error", (error) => {
      clean();
      reject(new Error("\u4E0B\u8F7D\u5668\u65E0\u6CD5\u542F\u52A8\uFF1A" + safeError(error.message)));
    });
    child.once("close", async (code) => {
      clean();
      if (failure) return reject(failure);
      if (code !== 0) return reject(new Error(downloadFailure(stderr || "\u4E0B\u8F7D\u5668\u9000\u51FA " + code, target.platform)));
      try {
        const names = (await readdir5(directory)).filter((name) => /^video\.(mp4|mkv|webm|mov|avi|m4v|mpeg|mpg)$/.test(name));
        if (names.length !== 1) throw new Error("\u672A\u53D6\u5F97\u5B8C\u6574\u89C6\u9891\uFF0C\u53EF\u80FD\u53D7\u767B\u5F55\u3001\u65F6\u957F\u3001\u5927\u5C0F\u6216\u683C\u5F0F\u9650\u5236");
        const path = join5(directory, names[0]);
        if ((await stat4(path)).size > MAX_VIDEO_BYTES) throw new Error("\u89C6\u9891\u8D85\u8FC7 256 MiB \u9650\u5236");
        resolve4({ path, title });
      } catch (error) {
        reject(error);
      }
    });
  });
}
function createVideoIngestion({ directory, keyFile, read, download = downloadVideo }) {
  const store = new LibraryStore(directory, { keyFile }), settings = new MediaSettings(store), cache = new MediaCache(store);
  const platforms = createVideoPlatforms({ settings, ...read ? { read } : {} });
  async function cleanup() {
    await cache.removeStalePlayback();
    const workRoot = join5(store.internal, "downloads");
    await mkdir5(workRoot, { recursive: true, mode: 448 });
    for (const entry of await readdir5(workRoot, { withFileTypes: true })) {
      if (!entry.isDirectory() || !/^\d+-[a-f0-9]{24}-[A-Za-z0-9]{6}$/.test(entry.name)) continue;
      try {
        process.kill(Number(entry.name.split("-")[0]), 0);
      } catch (error) {
        if (error.code === "ESRCH") await rm3(join5(workRoot, entry.name), { recursive: true, force: true });
      }
    }
  }
  async function importVideo({ url, signal, onProgress = (_value) => {
  } }) {
    const target = videoUrl(url), id = stableId("video:" + target.url);
    return store.withJobLock(id, async () => {
      signal?.throwIfAborted();
      const existing = (await store.resources()).find((item) => item.id === id);
      if (existing) {
        try {
          await access2(cache.path(id));
          return { resource: existing, cached: true };
        } catch (error) {
          if (error.code !== "ENOENT") throw error;
        }
      }
      const workRoot = join5(store.internal, "downloads");
      await mkdir5(workRoot, { recursive: true, mode: 448 });
      const work = await mkdtemp(join5(workRoot, process.pid + "-" + id + "-"));
      try {
        onProgress({ phase: "resolving", percent: 0 });
        let details;
        if (target.platform === "bilibili" || await settings.key()) {
          try {
            details = await platforms.info(target.url, { signal });
          } catch {
            signal?.throwIfAborted();
          }
        }
        const media = await download(target.url, work, { signal, onProgress });
        signal?.throwIfAborted();
        const info = await inspectVideo(media.path);
        signal?.throwIfAborted();
        onProgress({ phase: "encrypting", percent: 99 });
        const path = await cache.seal(id, media.path);
        signal?.throwIfAborted();
        const resource = { schemaVersion: 1, id, kind: "video", title: media.title || details?.title || info.title, source: { adapter: target.platform, url: target.url }, assets: [{ role: "media", mime: "application/x-moyu-video", path }], metadata: { author: details?.author, description: details?.description, views: details?.views, metadataFetched: Boolean(details), width: info.width, height: info.height, duration: info.duration, hasAudio: info.hasAudio, managedMedia: true, extension: extname3(media.path) }, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        await store.putResource(resource);
        return { resource, cached: false };
      } catch (error) {
        await rm3(cache.path(id), { force: true });
        throw error;
      } finally {
        await rm3(work, { recursive: true, force: true });
      }
    });
  }
  return { store, settings, cache, platforms, importVideo, cleanup };
}

// src/ui/video.tsx
var prefix = "opencode-moyu:video:";
function createVideoReader(api, library, settings) {
  const [video, setVideo] = createSignal();
  const [frame, setFrame] = createSignal([]);
  const [frameSize, setFrameSize] = createSignal({
    width: 1,
    height: 1
  });
  const [state, setState] = createSignal({
    position: 0,
    playing: false,
    muted: true,
    loading: false
  });
  const [error, setError] = createSignal("");
  const [busy, setBusy] = createSignal(false);
  const [downloadProgress, setDownloadProgress] = createSignal("");
  const [presentation, setPresentation] = createSignal(api.kv.get(prefix + "presentation", "auto"));
  const [protocol, setProtocol] = createSignal(imageProtocol(OpenTui, api.renderer));
  const [sourceProgress, setSourceProgress] = createSignal("");
  let sourceAbort;
  const inline = new InlineImage(OpenTui, api.renderer, (cause) => {
    setPresentation("pixel");
    showError(cause);
  });
  const useImage = () => presentation() !== "pixel" && protocol() !== "legacy";
  const qualityLabel = () => !useImage() ? "\u50CF\u7D20\u98CE" : ["kitty", "sixel"].includes(protocol()) ? "\u539F\u753B" : "\u7EC6\u817B\u5B57\u7B26";
  const capabilitiesChanged = () => setProtocol(imageProtocol(OpenTui, api.renderer));
  api.renderer.on("capabilities", capabilitiesChanged);
  api.renderer.on("resize", capabilitiesChanged);
  const sources = createVideoIngestion({
    directory: library.directory,
    keyFile: library.vault.keyFile
  });
  let downloadAbort;
  let downloadTask;
  const loads = /* @__PURE__ */ new Set();
  let token = 0, resizeTimer;
  const colors = /* @__PURE__ */ new Map();
  function color(value) {
    if (!value) return void 0;
    if (!colors.has(value)) colors.set(value, "#" + value.split(",").map((n) => Number(n).toString(16).padStart(2, "0")).join(""));
    return colors.get(value);
  }
  const player = new PixelPlayer({
    frameSize: (width, height, columns, rows) => useImage() ? imageFrameSize(width, height, columns, rows, api.renderer, protocol()) : pixelSize(width, height, columns, rows),
    onFrame: (bytes, size) => {
      if (useImage()) {
        inline.present(bytes, size);
        return;
      }
      setFrameSize({
        width: size.width,
        height: size.height / 2
      });
      setFrame(pixelRuns(bytes, size.width, size.height).map((run) => ({
        text: run.text,
        fg: color(run.fg),
        bg: color(run.bg)
      })));
    },
    onState: setState,
    onError: (message) => {
      setError(message);
      api.ui.toast({
        title: "\u50CF\u7D20\u5F71\u9662",
        message,
        variant: "error"
      });
    }
  });
  function save() {
    const current = video();
    if (current) api.kv.set(prefix + current.id, player.position);
  }
  const saveTimer = setInterval(() => {
    if (player.playing) save();
  }, 5e3);
  function pause() {
    player.pause();
    save();
  }
  let removalTimer;
  const resourceWatcher = watch(join6(library.internal, "resources"), (_event, filename) => {
    const current = video();
    if (!current || filename?.toString() !== current.id + ".enc") return;
    clearTimeout(removalTimer);
    removalTimer = setTimeout(() => {
      void access3(join6(library.internal, "resources", current.id + ".enc")).catch((cause) => {
        if (cause.code !== "ENOENT" || api.lifecycle.signal.aborted || video()?.id !== current.id) return;
        ++token;
        pause();
        setVideo(void 0);
        setFrame([]);
        inline.clear();
        player.video = void 0;
        api.kv.set(prefix + current.id, 0);
        api.kv.set(prefix + "last", "");
        void current.release?.().catch(() => {
        });
      });
    }, 50);
  });
  function releaseManaged() {
    const current = video();
    if (!current?.release) return;
    ++token;
    pause();
    setBusy(false);
    setVideo(void 0);
    setFrame([]);
    inline.clear();
    player.video = void 0;
    void current.release().catch(() => {
    });
  }
  function load(input, resource) {
    const pending = loadVideo(input, resource);
    loads.add(pending);
    void pending.finally(() => loads.delete(pending));
    return pending;
  }
  async function loadVideo(input, resource) {
    const request = ++token;
    setBusy(true);
    setError("");
    pause();
    try {
      const next = resource ? await sources.cache.open(resource) : await addLocalVideo(library, input, api.state.path.directory);
      if (request !== token || api.lifecycle.signal.aborted || !settings.active()) {
        await next.release?.();
        return;
      }
      const previous = video();
      await previous?.release?.();
      if (request !== token || api.lifecycle.signal.aborted || !settings.active()) {
        await next.release?.();
        return;
      }
      setVideo(next);
      setFrame([]);
      inline.clear();
      settings.activate();
      api.kv.set(prefix + "last", next.id);
      await player.load(next, api.kv.get(prefix + next.id, 0));
    } catch (cause) {
      if (request !== token || api.lifecycle.signal.aborted) return;
      const message = cause instanceof Error ? cause.message : String(cause);
      setError(message);
      api.ui.toast({
        title: "\u89C6\u9891\u6253\u5F00\u5931\u8D25",
        message,
        variant: "error"
      });
    } finally {
      if (request === token) setBusy(false);
    }
  }
  function prompt() {
    settings.dialog(() => _$createComponent(api.ui.DialogPrompt, {
      title: "\u6253\u5F00\u89C6\u9891 \xB7 \u672C\u5730\u6587\u4EF6",
      placeholder: "\u4F8B\u5982 /mnt/d/videos/\u89C6\u9891.mp4",
      get onCancel() {
        return settings.close;
      },
      onConfirm: (path) => {
        settings.close();
        void load(path);
      }
    }));
  }
  function showError(cause) {
    if (api.lifecycle.signal.aborted) return;
    const message = cause instanceof Error ? cause.message : String(cause);
    setError(message);
    api.ui.toast({
      title: "\u89C6\u9891\u6765\u6E90",
      message,
      variant: "error"
    });
  }
  function download(url) {
    if (downloadTask) {
      api.ui.toast({
        message: "\u5DF2\u6709\u4E0B\u8F7D\u4EFB\u52A1\uFF0C\u8BF7\u7B49\u5F85\u6216\u70B9\u51FB\u53D6\u6D88",
        variant: "info"
      });
      return;
    }
    const pending = runDownload(url);
    downloadTask = pending;
    void pending.finally(() => {
      if (downloadTask === pending) downloadTask = void 0;
    });
    return pending;
  }
  async function runDownload(url) {
    if (downloadAbort) return api.ui.toast({
      message: "\u5DF2\u6709\u4E0B\u8F7D\u4EFB\u52A1\uFF0C\u8BF7\u7B49\u5F85\u6216\u70B9\u51FB\u53D6\u6D88",
      variant: "info"
    });
    const abort = downloadAbort = new AbortController();
    const selection = token;
    pause();
    setError("");
    setDownloadProgress("\u6B63\u5728\u89E3\u6790\u89C6\u9891\u6765\u6E90\u2026");
    try {
      const result = await sources.importVideo({
        url,
        signal: abort.signal,
        onProgress: (progress) => {
          if (!api.lifecycle.signal.aborted) setDownloadProgress(progress.phase === "encrypting" ? "\u6B63\u5728\u52A0\u5BC6\u5165\u5E93\u2026" : `\u6B63\u5728\u4E0B\u8F7D ${progress.percent.toFixed(0)}% \xB7 \u70B9\u51FB\u53D6\u6D88\u53EF\u505C\u6B62`);
        }
      });
      if (api.lifecycle.signal.aborted || abort.signal.aborted) return;
      api.ui.toast({
        message: result.cached ? "\u5DF2\u590D\u7528\u89C6\u9891\u7F13\u5B58" : "\u89C6\u9891\u5DF2\u52A0\u5BC6\u5165\u5E93",
        variant: "info"
      });
      if (settings.active() && token === selection) await load("", result.resource);
    } catch (cause) {
      if (!api.lifecycle.signal.aborted) showError(cause);
    } finally {
      if (downloadAbort === abort) {
        downloadAbort = void 0;
        setDownloadProgress("");
      }
    }
  }
  function promptUrl() {
    settings.dialog(() => _$createComponent(api.ui.DialogPrompt, {
      title: "\u5BFC\u5165 B \u7AD9 / YouTube \u89C6\u9891",
      placeholder: "\u5B8C\u6574\u89C6\u9891\u94FE\u63A5\u6216 BV \u53F7\uFF0C\u4F18\u5148 480p / 256 MiB / 60 \u5206\u949F",
      get onCancel() {
        return settings.close;
      },
      onConfirm: (url) => {
        settings.close();
        void download(url);
      }
    }));
  }
  async function querySource(label, request, show) {
    sourceAbort?.abort();
    const abort = sourceAbort = new AbortController();
    setError("");
    setSourceProgress(label);
    try {
      const result = await request(abort.signal);
      if (sourceAbort === abort && !abort.signal.aborted && !api.lifecycle.signal.aborted && settings.active()) show(result);
    } catch (cause) {
      if (!abort.signal.aborted) showError(cause);
    } finally {
      if (sourceAbort === abort) {
        sourceAbort = void 0;
        setSourceProgress("");
      }
    }
  }
  function popular(page = 1) {
    settings.close();
    void querySource("\u6B63\u5728\u83B7\u53D6 B \u7AD9\u70ED\u95E8\u2026", (signal) => sources.platforms.popular({
      page,
      signal
    }), (result) => {
      if (!result.items.length) return api.ui.toast({
        message: "\u5F53\u524D\u6CA1\u6709\u66F4\u591A\u70ED\u95E8\u89C6\u9891",
        variant: "info"
      });
      settings.dialog(() => _$createComponent(api.ui.DialogSelect, {
        get title() {
          return `B \u7AD9\u70ED\u95E8 \xB7 \u7B2C ${result.page} \u9875`;
        },
        placeholder: "\u70B9\u51FB\u89C6\u9891\u4E0B\u8F7D\uFF0C\u5173\u95ED\u540E\u4ECD\u53EF\u70B9\u51FB\u300C\u70ED\u95E8\u300D\u7EE7\u7EED\u6D4F\u89C8",
        get options() {
          return [...result.items.map((item) => ({
            title: item.title,
            value: item.url,
            description: `${item.author} \xB7 ${mediaTime(item.duration)}`
          })), ...result.hasMore ? [{
            title: "\u6362\u4E00\u6279 \u2192",
            value: "next",
            description: "\u4E0B\u4E00\u9875\u70ED\u95E8\u89C6\u9891"
          }] : [], ...page > 1 ? [{
            title: "\u2190 \u4E0A\u4E00\u6279",
            value: "previous",
            description: "\u8FD4\u56DE\u4E0A\u4E00\u9875"
          }] : []];
        },
        onSelect: (item) => {
          settings.close();
          if (item.value === "next") popular(page + 1);
          else if (item.value === "previous") popular(page - 1);
          else void download(String(item.value));
        }
      }));
    });
  }
  function searchPlatform() {
    settings.dialog(() => _$createComponent(api.ui.DialogSelect, {
      title: "\u9009\u62E9\u89C6\u9891\u641C\u7D22\u6765\u6E90",
      options: [{
        title: "\u54D4\u54E9\u54D4\u54E9",
        value: "bilibili",
        description: "\u516C\u5F00\u89C6\u9891\u641C\u7D22"
      }, {
        title: "YouTube",
        value: "youtube",
        description: "\u4F7F\u7528\u672C\u5730\u4FDD\u5B58\u7684 API Key"
      }],
      onSelect: (platform) => {
        settings.close();
        settings.dialog(() => _$createComponent(api.ui.DialogPrompt, {
          get title() {
            return `${platform.title} \xB7 \u641C\u7D22\u89C6\u9891`;
          },
          placeholder: "\u8F93\u5165\u5173\u952E\u8BCD\uFF0C\u6700\u591A\u8FD4\u56DE 5 \u4E2A\u7ED3\u679C",
          get onCancel() {
            return settings.close;
          },
          onConfirm: (query) => {
            settings.close();
            void querySource("\u6B63\u5728\u641C\u7D22\u89C6\u9891\u2026", (signal) => sources.platforms.search({
              platform: String(platform.value),
              query,
              signal
            }), (items) => {
              if (!items.length) return api.ui.toast({
                message: "\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u89C6\u9891",
                variant: "info"
              });
              settings.dialog(() => _$createComponent(api.ui.DialogSelect, {
                get title() {
                  return `${platform.title} \xB7 \u641C\u7D22\u7ED3\u679C`;
                },
                placeholder: "\u70B9\u51FB\u89C6\u9891\u4E0B\u8F7D\u5230\u4FA7\u680F\u64AD\u653E\u5668",
                get options() {
                  return items.map((item) => ({
                    title: item.title,
                    value: item.url,
                    description: item.author
                  }));
                },
                onSelect: (item) => {
                  settings.close();
                  void download(String(item.value));
                }
              }));
            });
          }
        }));
      }
    }));
  }
  function quality() {
    settings.dialog(() => _$createComponent(api.ui.DialogSelect, {
      title: "\u4FA7\u680F\u89C6\u9891\u753B\u8D28",
      get placeholder() {
        return _$memo(() => protocol() === "legacy")() ? "\u5F53\u524D OpenCode \u7F3A\u5C11\u56FE\u7247\u7EC4\u4EF6\uFF0C\u4F7F\u7528\u50CF\u7D20\u98CE" : ["kitty", "sixel"].includes(protocol()) ? "\u5F53\u524D\u7EC8\u7AEF\u652F\u6301\u539F\u753B\uFF0C\u4ECD\u5728\u4FA7\u680F\u5185\u64AD\u653E" : "\u5F53\u524D\u7EC8\u7AEF\u672A\u542F\u7528\u56FE\u7247\u534F\u8BAE\uFF0C\u81EA\u52A8\u6A21\u5F0F\u4F7F\u7528\u7EC6\u817B\u5B57\u7B26\uFF1B\u539F\u753B\u9700\u8981\u652F\u6301 Sixel / Kitty \u7684\u7EC8\u7AEF";
      },
      get current() {
        return presentation();
      },
      options: [{
        title: "\u81EA\u52A8\u6E05\u6670\uFF08\u63A8\u8350\uFF09",
        value: "auto",
        description: "\u56FE\u7247\u534F\u8BAE\u53EF\u7528\u65F6\u663E\u793A\u539F\u753B\uFF0C\u5426\u5219\u4F7F\u7528\u7EC6\u817B\u5B57\u7B26"
      }, {
        title: "\u50CF\u7D20\u98CE",
        value: "pixel",
        description: "\u4FDD\u7559\u539F\u6765\u7684\u4F4E\u5F00\u9500\u5B57\u7B26\u753B\u9762"
      }],
      onSelect: (item) => {
        settings.close();
        setPresentation(String(item.value));
        api.kv.set(prefix + "presentation", item.value);
      }
    }));
  }
  async function sourceSettings() {
    try {
      const status = await sources.settings.status();
      if (api.lifecycle.signal.aborted) return;
      settings.dialog(() => _$createComponent(api.ui.DialogSelect, {
        title: "\u89C6\u9891\u6765\u6E90\u8BBE\u7F6E",
        placeholder: "API Key \u4EC5\u7528\u4E8E YouTube \u6570\u636E\u67E5\u8BE2\uFF0C\u672C\u5730\u52A0\u5BC6\u4FDD\u5B58",
        get options() {
          return [{
            title: status.youtubeApiKeyConfigured ? "\u66F4\u65B0 YouTube API Key" : "\u586B\u5199 YouTube API Key",
            value: "key",
            description: status.youtubeApiKeyConfigured ? "\u5DF2\u914D\u7F6E \xB7 \u4E0D\u56DE\u663E\u5BC6\u94A5" : "\u542F\u7528 YouTube Data API v3 \u540E\u586B\u5199"
          }, {
            title: "\u79FB\u9664\u4FDD\u5B58\u7684 YouTube API Key",
            value: "remove",
            description: "\u4E0D\u5F71\u54CD\u5DF2\u4E0B\u8F7D\u7684\u89C6\u9891"
          }];
        },
        onSelect: (item) => {
          settings.close();
          if (item.value === "remove") {
            settings.dialog(() => _$createComponent(api.ui.DialogConfirm, {
              title: "\u79FB\u9664 YouTube API Key",
              message: "\u79FB\u9664\u672C\u5730\u4FDD\u5B58\u7684\u5BC6\u94A5\uFF1F\u82E5\u8BBE\u7F6E\u4E86 YOUTUBE_API_KEY \u73AF\u5883\u53D8\u91CF\uFF0C\u4ECD\u4F1A\u4F7F\u7528\u73AF\u5883\u53D8\u91CF\u3002",
              get onCancel() {
                return settings.close;
              },
              onConfirm: () => {
                settings.close();
                void sources.settings.removeKey().then(() => sourceSettings()).catch(showError);
              }
            }));
            return;
          }
          settings.dialog(() => _$createComponent(api.ui.DialogPrompt, {
            title: "YouTube API Key \xB7 \u672C\u5730\u52A0\u5BC6\u4FDD\u5B58",
            placeholder: "\u7C98\u8D34\u5B8C\u6574 API Key\uFF0C\u4FDD\u5B58\u540E\u4E0D\u56DE\u663E",
            get onCancel() {
              return settings.close;
            },
            onConfirm: (key) => {
              settings.close();
              void sources.settings.saveKey(key).then(() => api.ui.toast({
                message: "YouTube API Key \u5DF2\u52A0\u5BC6\u4FDD\u5B58",
                variant: "info"
              })).catch(showError);
            }
          }));
        }
      }));
    } catch (cause) {
      showError(cause);
    }
  }
  async function shelf() {
    try {
      const resources = (await library.resources()).filter((item) => item.kind === "video");
      if (api.lifecycle.signal.aborted) return;
      settings.dialog(() => _$createComponent(api.ui.DialogSelect, {
        title: "\u89C6\u9891\u5E93 \xB7 \u50CF\u7D20\u5F71\u9662",
        placeholder: "\u9009\u62E9\u89C6\u9891\uFF0C\u6216\u6253\u5F00\u672C\u5730\u6587\u4EF6",
        get current() {
          return video()?.id;
        },
        get options() {
          return [{
            title: "\uFF0B \u6253\u5F00\u672C\u5730\u89C6\u9891\u2026",
            value: "",
            description: "MP4 / MKV / WebM / MOV / AVI / GIF"
          }, {
            title: "\uFF0B B \u7AD9 / YouTube \u89C6\u9891\u94FE\u63A5\u2026",
            value: "url",
            description: "\u4E0B\u8F7D\u53EF\u516C\u5F00\u8BBF\u95EE\u7684\u89C6\u9891\uFF0C\u52A0\u5BC6\u5165\u5E93"
          }, {
            title: "\u641C\u7D22\u5728\u7EBF\u89C6\u9891\u2026",
            value: "search",
            description: "\u54D4\u54E9\u54D4\u54E9 / YouTube"
          }, {
            title: "\u6D4F\u89C8 B \u7AD9\u70ED\u95E8\u2026",
            value: "popular",
            description: "\u76F4\u63A5\u9009\u89C6\u9891\uFF0C\u65E0\u9700\u94FE\u63A5\u6216 API Key"
          }, {
            title: "\u4FA7\u680F\u89C6\u9891\u753B\u8D28\u2026",
            value: "quality",
            description: qualityLabel()
          }, {
            title: "\u89C6\u9891\u6765\u6E90\u8BBE\u7F6E\u2026",
            value: "settings",
            description: "\u586B\u5199\u6216\u79FB\u9664 YouTube API Key"
          }, ...resources.map((item) => ({
            title: item.title,
            value: item.id,
            description: mediaTime(item.metadata.duration) + (item.metadata.managedMedia ? " \xB7 " + item.source.adapter + " \xB7 \u52A0\u5BC6\u7F13\u5B58" : " \xB7 \u672C\u5730\u6587\u4EF6")
          }))];
        },
        onSelect: (item) => {
          settings.close();
          if (!item.value) prompt();
          else if (item.value === "url") promptUrl();
          else if (item.value === "search") searchPlatform();
          else if (item.value === "popular") popular();
          else if (item.value === "quality") quality();
          else if (item.value === "settings") void sourceSettings();
          else void load("", resources.find((saved) => saved.id === item.value));
        }
      }));
    } catch (cause) {
      api.ui.toast({
        message: String(cause),
        variant: "error"
      });
    }
  }
  async function restore() {
    if (video() || busy()) return;
    const id = api.kv.get(prefix + "last", "");
    if (!id) return;
    const resource = (await library.resources()).find((item) => item.id === id && item.kind === "video");
    if (resource && !video() && !busy() && settings.active() && !api.lifecycle.signal.aborted) await load("", resource);
  }
  function remove() {
    const current = video();
    if (!current) return shelf();
    settings.dialog(() => _$createComponent(api.ui.DialogConfirm, {
      title: "\u4ECE\u89C6\u9891\u5E93\u79FB\u9664",
      get message() {
        return `\u79FB\u9664\u300A${current.title}\u300B\u7684\u8BB0\u5F55\u3001\u64AD\u653E\u8FDB\u5EA6\u53CA\u5DF2\u4E0B\u8F7D\u7684\u52A0\u5BC6\u7F13\u5B58\uFF1F\u672C\u5730\u5BFC\u5165\u7684\u539F\u6587\u4EF6\u4FDD\u7559\u3002`;
      },
      get onCancel() {
        return settings.close;
      },
      onConfirm: () => {
        settings.close();
        pause();
        ++token;
        void current.release?.().catch(() => {
        });
        void library.deleteResource(current.id).then(() => {
          if (api.lifecycle.signal.aborted) return;
          api.kv.set(prefix + current.id, 0);
          if (video()?.id === current.id) {
            setVideo(void 0);
            setFrame([]);
            inline.clear();
            player.video = void 0;
            api.kv.set(prefix + "last", "");
          }
        }).catch((cause) => api.ui.toast({
          message: String(cause),
          variant: "error"
        }));
      }
    }));
  }
  function seek(delta) {
    if (video()) {
      void player.seek(player.position + delta);
      save();
    }
  }
  function jump() {
    if (!video()) return prompt();
    settings.dialog(() => _$createComponent(api.ui.DialogPrompt, {
      title: "\u8DF3\u8F6C\u89C6\u9891 \xB7 \u8F93\u5165\u79D2\u6570\u6216 \u5206:\u79D2",
      placeholder: "\u4F8B\u5982 90 \u6216 1:30",
      get onCancel() {
        return settings.close;
      },
      onConfirm: (input) => {
        const parts = input.trim().split(":");
        if (!parts.length || parts.length > 3 || parts.some((part) => !/^\d+(?:\.\d+)?$/.test(part))) return api.ui.toast({
          message: "\u8BF7\u8F93\u5165\u6709\u6548\u65F6\u95F4",
          variant: "error"
        });
        const seconds = parts.reduce((sum, part) => sum * 60 + Number(part), 0);
        settings.close();
        void player.seek(seconds);
        save();
      }
    }));
  }
  function play() {
    setError("");
    if (!video()) prompt();
    else if (player.playing) pause();
    else void player.play();
  }
  async function mute() {
    setError("");
    try {
      await player.setMuted(!state().muted);
    } catch (cause) {
      const message = String(cause);
      setError(message);
      api.ui.toast({
        message,
        variant: "error"
      });
    }
  }
  createEffect(() => {
    const columns = settings.columns(), rows = settings.rows(), active = settings.active();
    clearTimeout(resizeTimer);
    if (!active) {
      sourceAbort?.abort();
      untrack(() => {
        pause();
        releaseManaged();
      });
      return;
    }
    untrack(() => {
      void restore().catch(showError);
    });
    resizeTimer = setTimeout(() => {
      if (!api.lifecycle.signal.aborted) void player.resize(columns, rows);
    }, 150);
  });
  createEffect(() => {
    const image = useImage();
    protocol();
    player.scaleFilter = image ? "lanczos" : "neighbor";
    inline.clear();
    setFrame([]);
    untrack(() => {
      if (settings.active() && video()) void player.start(player.playing);
    });
  });
  async function dispose() {
    ++token;
    sourceAbort?.abort();
    downloadAbort?.abort();
    resourceWatcher.close();
    clearTimeout(removalTimer);
    clearInterval(saveTimer);
    clearTimeout(resizeTimer);
    save();
    player.dispose();
    inline.dispose();
    api.renderer.off("capabilities", capabilitiesChanged);
    api.renderer.off("resize", capabilitiesChanged);
    await Promise.allSettled([...loads, downloadTask, video()?.release?.()]);
  }
  void sources.cleanup().catch(showError);
  function ImageSurface() {
    onCleanup(() => inline.unmount());
    return (() => {
      var _el$ = _$createElement("box");
      _$use((node) => inline.mount(node), _el$);
      _$setProp(_el$, "width", "100%");
      _$setProp(_el$, "height", "100%");
      return _el$;
    })();
  }
  function View(props) {
    const Button = props.Button;
    return [(() => {
      var _el$2 = _$createElement("box");
      _$setProp(_el$2, "flexShrink", 0);
      _$insert(_el$2, _$createComponent(Button, {
        get label() {
          return _$memo(() => !!busy())() ? "\u6B63\u5728\u6253\u5F00\u89C6\u9891\u2026" : video()?.title ?? "\u8BF7\u9009\u62E9\u672C\u5730\u89C6\u9891";
        },
        action: shelf
      }), null);
      _$insert(_el$2, _$createComponent(Show, {
        get when() {
          return downloadProgress() || sourceProgress();
        },
        get fallback() {
          return (() => {
            var _el$8 = _$createElement("text");
            _$setProp(_el$8, "height", 1);
            _$setProp(_el$8, "wrapMode", "none");
            _$insert(_el$8, (() => {
              var _c$ = _$memo(() => !!error());
              return () => _c$() ? "\u64AD\u653E\u5F02\u5E38\uFF0C\u53EF\u91CD\u65B0\u6253\u5F00\u89C6\u9891" : _$memo(() => !!!video())() ? `${qualityLabel()} \xB7 \u9ED8\u8BA4\u9759\u97F3` : _$memo(() => !!state().loading)() ? "\u6B63\u5728\u89E3\u7801\u2026" : `${state().playing ? "\u64AD\u653E\u4E2D" : "\u5DF2\u6682\u505C"} \xB7 ${qualityLabel()}`;
            })());
            return _el$8;
          })();
        },
        get children() {
          return _$createComponent(Button, {
            get label() {
              return `[\u53D6\u6D88] ${downloadProgress() || sourceProgress()}`;
            },
            action: () => {
              downloadAbort?.abort();
              sourceAbort?.abort();
            }
          });
        }
      }), null);
      _$effect((_$p) => _$setProp(_el$2, "height", 2 + props.gap, _$p));
      return _el$2;
    })(), (() => {
      var _el$3 = _$createElement("box");
      _$setProp(_el$3, "flexShrink", 0);
      _$setProp(_el$3, "alignItems", "center");
      _$setProp(_el$3, "justifyContent", "center");
      _$insert(_el$3, _$createComponent(Show, {
        get when() {
          return video();
        },
        get fallback() {
          return (() => {
            var _el$9 = _$createElement("text");
            _$insertNode(_el$9, _$createTextNode(`\u70B9\u51FB\u300C\u641C\u7D22\u300D\u6216\u300C\u70ED\u95E8\u300D\u9009\u89C6\u9891`));
            return _el$9;
          })();
        },
        get children() {
          return _$createComponent(Show, {
            get when() {
              return useImage();
            },
            get fallback() {
              return (() => {
                var _el$1 = _$createElement("text");
                _$setProp(_el$1, "selectable", false);
                _$setProp(_el$1, "wrapMode", "none");
                _$insert(_el$1, _$createComponent(For, {
                  get each() {
                    return frame();
                  },
                  children: (run) => (() => {
                    var _el$10 = _$createElement("span");
                    _$insert(_el$10, () => run.text);
                    _$effect((_$p) => _$setProp(_el$10, "style", {
                      fg: run.fg,
                      bg: run.bg
                    }, _$p));
                    return _el$10;
                  })()
                }));
                _$effect((_p$) => {
                  var _v$3 = frameSize().width, _v$4 = frameSize().height;
                  _v$3 !== _p$.e && (_p$.e = _$setProp(_el$1, "width", _v$3, _p$.e));
                  _v$4 !== _p$.t && (_p$.t = _$setProp(_el$1, "height", _v$4, _p$.t));
                  return _p$;
                }, {
                  e: void 0,
                  t: void 0
                });
                return _el$1;
              })();
            },
            get children() {
              return _$createComponent(ImageSurface, {});
            }
          });
        }
      }));
      _$effect((_$p) => _$setProp(_el$3, "height", settings.rows(), _$p));
      return _el$3;
    })(), (() => {
      var _el$4 = _$createElement("box"), _el$5 = _$createElement("box"), _el$6 = _$createElement("box"), _el$7 = _$createElement("box");
      _$insertNode(_el$4, _el$5);
      _$insertNode(_el$4, _el$6);
      _$insertNode(_el$4, _el$7);
      _$setProp(_el$4, "flexShrink", 0);
      _$insert(_el$4, _$createComponent(Button, {
        get label() {
          return `${mediaTime(state().position)} / ${mediaTime(video()?.duration)}`;
        },
        action: jump,
        muted: true
      }), _el$5);
      _$setProp(_el$5, "height", 1);
      _$setProp(_el$5, "flexDirection", "row");
      _$setProp(_el$5, "gap", 1);
      _$insert(_el$5, _$createComponent(Button, {
        get label() {
          return state().playing ? "[\u6682\u505C]" : "[\u64AD\u653E]";
        },
        action: play
      }), null);
      _$insert(_el$5, _$createComponent(Button, {
        get label() {
          return state().muted ? "[\u5F00\u542F\u58F0\u97F3]" : "[\u9759\u97F3]";
        },
        action: mute
      }), null);
      _$setProp(_el$6, "height", 1);
      _$setProp(_el$6, "flexDirection", "row");
      _$setProp(_el$6, "justifyContent", "space-between");
      _$insert(_el$6, _$createComponent(Button, {
        label: "[\u540E\u900010\u79D2]",
        action: () => seek(-10)
      }), null);
      _$insert(_el$6, _$createComponent(Button, {
        label: "[\u524D\u8FDB10\u79D2]",
        action: () => seek(10)
      }), null);
      _$setProp(_el$7, "height", 1);
      _$insert(_el$7, _$createComponent(Button, {
        get label() {
          return `[\u753B\u8D28\uFF1A${qualityLabel()}]`;
        },
        action: quality
      }));
      _$effect((_p$) => {
        var _v$ = 4 + props.gap, _v$2 = props.gap;
        _v$ !== _p$.e && (_p$.e = _$setProp(_el$4, "height", _v$, _p$.e));
        _v$2 !== _p$.t && (_p$.t = _$setProp(_el$4, "paddingTop", _v$2, _p$.t));
        return _p$;
      }, {
        e: void 0,
        t: void 0
      });
      return _el$4;
    })()];
  }
  return {
    View,
    shelf,
    remove,
    pause,
    restore,
    dispose,
    jump,
    seek,
    search: searchPlatform,
    popular
  };
}

// src/ui/index.tsx
var prefix2 = "opencode-moyu:";
var pluginRoot = resolve3(dirname4(fileURLToPath(import.meta.url)), "..");
var tui = async (api, options) => {
  const configuredRows = Number(options?.rows);
  const fixedRows = Number.isInteger(configuredRows) && configuredRows >= 4 ? Math.min(configuredRows, 40) : void 0;
  const booksDir = expandPath(typeof options?.booksDir === "string" ? options.booksDir : resolve3(pluginRoot, "books"));
  const keyFile = typeof options?.keyFile === "string" ? expandPath(options.keyFile) : void 0;
  const library = new LibraryStore(booksDir, {
    keyFile
  });
  await library.ready();
  const collect = api.moyu?.collect;
  const [visible, setVisible] = createSignal2(true);
  const [mode, setMode] = createSignal2("novel");
  const [book, setBook] = createSignal2();
  const [offset, setOffset] = createSignal2(0);
  const [height, setHeight] = createSignal2(api.renderer.height);
  const [width, setWidth] = createSignal2(api.renderer.width);
  const [bodyWidth, setBodyWidth] = createSignal2(36);
  const [busy, setBusy] = createSignal2(false);
  const [heightPercent, setHeightPercent] = createSignal2();
  const [widthPercent, setWidthPercent] = createSignal2();
  const [viewportHeight, setViewportHeight] = createSignal2();
  const [hostRows, setHostRows] = createSignal2(0);
  const onboarding = createMemo(() => options?.hostMajor === 2 || !api.kv.get("dismissed_getting_started", false) && !api.state.provider.some((provider) => provider.id !== "opencode" || Object.values(provider.models).some((model) => model.cost?.input !== 0)));
  const chromeRows = () => height() < 40 ? 9 : 12;
  const minimumRows = () => options?.hostMajor !== 2 && height() < 40 ? 2 : 4;
  const availableRows = createMemo(() => Math.max(minimumRows(), viewportHeight() === void 0 ? height() - (onboarding() ? 31 : 20) : viewportHeight() - chromeRows() - hostRows()));
  const rows = createMemo(() => heightPercent() === void 0 ? Math.min(fixedRows ?? 24, availableRows()) : Math.max(minimumRows(), Math.floor(availableRows() * heightPercent() / 100)));
  const pages = createMemo(() => paginate(book()?.text ?? "", bodyWidth(), rows()));
  const page = createMemo(() => pageAt(pages(), offset()));
  const currentChapter = createMemo(() => book()?.chapters.findLast((item) => item.offset <= offset())?.title ?? "\u6B63\u6587");
  let request = 0;
  let ownsDialog = false;
  let started = false;
  const progressKey = (path) => prefix2 + "position:" + createHash3("sha256").update(path).digest("hex");
  function save() {
    const current = book();
    if (current) api.kv.set(progressKey(current.path), offset());
  }
  function toast(message, variant = "info") {
    api.ui.toast({
      title: "\u6478\u9C7C\u9605\u8BFB",
      message,
      variant,
      duration: 3500
    });
  }
  function closeDialog() {
    ownsDialog = false;
    api.ui.dialog.clear();
  }
  function dialog(render) {
    ownsDialog = true;
    api.ui.dialog.replace(render, () => {
      ownsDialog = false;
    });
  }
  const video = createVideoReader(api, library, {
    columns: bodyWidth,
    rows,
    active: () => mode() === "video" && visible() && api.route.current.name === "session",
    activate: () => selectMode("video"),
    dialog,
    close: closeDialog
  });
  function selectMode(next) {
    save();
    setMode(next);
    api.kv.set(prefix2 + "mode", next);
    if (next === "video") void video.restore().catch((error) => toast(String(error), "error"));
  }
  async function open3(path, quiet = false) {
    const token = ++request;
    setBusy(true);
    try {
      let next = await loadBook(path, api.state.path.directory || process.cwd(), {
        keyFile
      });
      if (!next.resourceId) next = await library.importLocal(next);
      if (token !== request || api.lifecycle.signal.aborted) return;
      save();
      const stored = api.kv.get(progressKey(next.path), 0);
      setOffset(Number.isFinite(stored) ? Math.max(0, Math.min(stored, next.text.length - 1)) : 0);
      setBook(next);
      api.kv.set(prefix2 + "last", next.path);
      if (!quiet) {
        selectMode("novel");
        setVisible(true);
        api.kv.set(prefix2 + "visible", true);
        if (api.route.current.name !== "session") toast("\u5DF2\u6253\u5F00\uFF0C\u8FDB\u5165\u4F1A\u8BDD\u540E\u53EF\u5728\u53F3\u4FA7\u680F\u9605\u8BFB");
      }
    } catch (error) {
      if (token === request && !api.lifecycle.signal.aborted) toast(error instanceof Error ? error.message : String(error), "error");
    } finally {
      if (token === request) setBusy(false);
    }
  }
  function turn(direction) {
    if (mode() === "video") {
      video.seek(direction * 10);
      return;
    }
    if (!book() || busy()) return;
    const next = Math.max(0, Math.min(pages().length - 1, page() + direction));
    setOffset(pages()[next].start);
    save();
  }
  function toggle() {
    const next = !visible();
    setVisible(next);
    api.kv.set(prefix2 + "visible", next);
    if (!next && ownsDialog) closeDialog();
    if (next && api.route.current.name !== "session") toast("\u9605\u8BFB\u9762\u677F\u4F4D\u4E8E\u4F1A\u8BDD\u53F3\u4FA7\u680F\uFF1B\u8FDB\u5165\u4F1A\u8BDD\u540E\u663E\u793A");
  }
  function promptFile() {
    dialog(() => _$createComponent2(api.ui.DialogPrompt, {
      title: "\u6253\u5F00\u5C0F\u8BF4 \xB7 \u672C\u5730 TXT / Markdown",
      placeholder: "/mnt/d/books/\u5C0F\u8BF4.txt \u6216 ~/books/\u5C0F\u8BF4.txt",
      onCancel: closeDialog,
      onConfirm: (path) => {
        closeDialog();
        void open3(path);
      }
    }));
  }
  function promptCollection() {
    dialog(() => _$createComponent2(api.ui.DialogPrompt, {
      title: "\u8BA9\u5F53\u524D\u6A21\u578B\u91C7\u96C6\u5C0F\u8BF4",
      placeholder: "\u4F8B\u5982\uFF1A\u5FD8\u8BED\u7684\u51E1\u4EBA\u4FEE\u4ED9\u4F20\uFF0C\u5148\u91C7\u96C620\u7AE0\uFF1B\u4E5F\u53EF\u8F93\u5165\u76EE\u5F55\u94FE\u63A5",
      onCancel: closeDialog,
      onConfirm: (query) => {
        closeDialog();
        void collect?.(query);
      }
    }));
  }
  async function shelf() {
    try {
      const items = await listBooks(booksDir, {
        keyFile
      });
      if (api.lifecycle.signal.aborted) return;
      dialog(() => _$createComponent2(api.ui.DialogSelect, {
        title: "\u4E66\u67B6 \xB7 \u6478\u9C7C\u9605\u8BFB",
        placeholder: "\u641C\u7D22\u4E66\u540D\uFF0C\u6216\u9009\u62E9\u91C7\u96C6 / \u6253\u5F00\u672C\u5730\u6587\u4EF6",
        get options() {
          return [...collect ? [{
            title: "\uFF0B \u8BA9\u5F53\u524D\u6A21\u578B\u91C7\u96C6\u5C0F\u8BF4\u2026",
            value: "moyu:collect",
            description: "\u8F93\u5165\u4E66\u540D\u3001\u4F5C\u8005\u6216\u76EE\u5F55\u94FE\u63A5"
          }] : [], {
            title: "\uFF0B \u6253\u5F00\u672C\u5730\u6587\u4EF6\u2026",
            value: "",
            description: "\u8F93\u5165\u4EFB\u610F TXT \u6587\u4EF6\u8DEF\u5F84"
          }, ...items.map((item) => ({
            title: item.title,
            value: item.path,
            description: item.path
          }))];
        },
        onSelect: (item) => {
          closeDialog();
          if (item.value === "moyu:collect") promptCollection();
          else if (item.value) void open3(String(item.value));
          else promptFile();
        }
      }));
    } catch {
      promptFile();
    }
  }
  function openMoyu() {
    setVisible(true);
    api.kv.set(prefix2 + "visible", true);
    return mode() === "video" ? video.shelf() : shelf();
  }
  function chapters() {
    if (mode() !== "novel") selectMode("novel");
    const current = book();
    if (!current) return promptFile();
    const items = current.chapters.length ? current.chapters : chaptersOf(current.text);
    if (!items.length) return toast("\u6CA1\u6709\u8BC6\u522B\u5230\u7AE0\u8282\u6807\u9898\uFF0C\u53EF\u7528\u300C\u8DF3\u8F6C\u8FDB\u5EA6\u300D\u5B9A\u4F4D");
    dialog(() => _$createComponent2(api.ui.DialogSelect, {
      get title() {
        return `${current.title} \xB7 \u76EE\u5F55`;
      },
      placeholder: "\u641C\u7D22\u7AE0\u8282",
      get current() {
        return (items.findLast((item) => item.offset <= offset()) ?? items[0]).offset;
      },
      get options() {
        return items.map((item) => ({
          title: item.title,
          value: item.offset
        }));
      },
      onSelect: (item) => {
        closeDialog();
        setOffset(Number(item.value));
        save();
      }
    }));
  }
  function jump() {
    if (mode() === "video") return video.jump();
    if (!book()) return promptFile();
    dialog(() => _$createComponent2(api.ui.DialogPrompt, {
      title: "\u8DF3\u8F6C\u9605\u8BFB\u8FDB\u5EA6 \xB7 \u8F93\u5165 0\u2013100",
      placeholder: "\u4F8B\u5982 35 \u6216 35%",
      onCancel: closeDialog,
      onConfirm: (input) => {
        const value = Number(input.trim().replace(/%$/, ""));
        if (!input.trim() || !Number.isFinite(value) || value < 0 || value > 100) return toast("\u8BF7\u8F93\u5165 0\u2013100 \u4E4B\u95F4\u7684\u767E\u5206\u6BD4", "error");
        closeDialog();
        setOffset(Math.min(book().text.length - 1, Math.floor(book().text.length * value / 100)));
        save();
      }
    }));
  }
  function setSize(percent) {
    setHeightPercent(percent);
    api.kv.set(prefix2 + "heightPercent", percent ?? null);
    save();
  }
  function customSize() {
    dialog(() => _$createComponent2(api.ui.DialogPrompt, {
      title: "\u9605\u8BFB\u533A\u9AD8\u5EA6 \xB7 \u8F93\u5165 10\u2013100%",
      placeholder: "\u4F8B\u5982 75\uFF0C\u6309\u53EF\u7528\u6B63\u6587\u9AD8\u5EA6\u8BA1\u7B97",
      onCancel: closeDialog,
      onConfirm: (input) => {
        const value = Number(input.trim().replace(/%$/, ""));
        if (!input.trim() || !Number.isFinite(value) || value < 10 || value > 100) return toast("\u8BF7\u8F93\u5165 10\u2013100 \u4E4B\u95F4\u7684\u767E\u5206\u6BD4", "error");
        closeDialog();
        setSize(Math.round(value));
      }
    }));
  }
  function heightSize() {
    const selected = heightPercent() === void 0 ? "auto" : String(heightPercent());
    dialog(() => _$createComponent2(api.ui.DialogSelect, {
      title: "\u9605\u8BFB\u533A\u9AD8\u5EA6",
      placeholder: "\u70B9\u51FB\u9009\u62E9\u9AD8\u5EA6\uFF0C\u8BBE\u7F6E\u81EA\u52A8\u4FDD\u5B58",
      get options() {
        return [{
          title: "\u81EA\u52A8\u9AD8\u5EA6",
          value: "auto",
          description: "\u6062\u590D\u9ED8\u8BA4\u6B63\u6587\u884C\u6570"
        }, ...[25, 50, 75, 100].map((value) => ({
          title: `\u9AD8\u5EA6 ${value}%`,
          value: String(value),
          description: "\u5360\u53EF\u7528\u6B63\u6587\u9AD8\u5EA6\u7684\u6BD4\u4F8B"
        })), {
          title: "\u81EA\u5B9A\u4E49\u9AD8\u5EA6\u2026",
          value: "custom",
          description: "\u8F93\u5165 10\u2013100%"
        }];
      },
      current: selected,
      onSelect: (item) => {
        closeDialog();
        if (item.value === "custom") return customSize();
        setSize(item.value === "auto" ? void 0 : Number(item.value));
      }
    }));
  }
  function widthSize() {
    const selected = widthPercent() === void 0 ? "auto" : String(widthPercent());
    dialog(() => _$createComponent2(api.ui.DialogSelect, {
      title: "\u9605\u8BFB\u533A\u5BBD\u5EA6",
      placeholder: "\u70B9\u51FB\u9009\u62E9\u4FA7\u680F\u5BBD\u5EA6\uFF0C\u6309\u4F1A\u8BDD\u53EF\u7528\u5BBD\u5EA6\u8BA1\u7B97",
      get options() {
        return [{
          title: "\u9ED8\u8BA4\u5BBD\u5EA6",
          value: "auto",
          description: "\u6062\u590D OpenCode \u539F\u6709\u4FA7\u680F\u5BBD\u5EA6"
        }, ...[25, 33, 40, 50, 60].map((value) => ({
          title: `\u5BBD\u5EA6 ${value}%`,
          value: String(value),
          description: "\u540C\u65F6\u4FDD\u7559\u4E3B\u4F1A\u8BDD\u7684\u8F93\u5165\u7A7A\u95F4"
        }))];
      },
      current: selected,
      onSelect: (item) => {
        closeDialog();
        const percent = item.value === "auto" ? void 0 : Number(item.value);
        setWidthPercent(percent);
        api.kv.set(prefix2 + "widthPercent", percent ?? null);
        save();
      }
    }));
  }
  function size() {
    dialog(() => _$createComponent2(api.ui.DialogSelect, {
      title: "\u9605\u8BFB\u533A\u57DF\u5927\u5C0F",
      placeholder: "\u70B9\u51FB\u9009\u62E9\u8981\u8C03\u6574\u7684\u5C3A\u5BF8",
      get options() {
        return [...options?.hostMajor === 2 ? [{
          title: "\u8C03\u6574\u5BBD\u5EA6",
          value: "width",
          description: "\u6539\u53D8\u4FA7\u680F\u5BBD\u5EA6\u5E76\u91CD\u65B0\u5206\u9875"
        }] : [], {
          title: "\u8C03\u6574\u9AD8\u5EA6",
          value: "height",
          description: "\u6539\u53D8\u6B63\u6587\u9AD8\u5EA6\uFF0C\u9875\u7801\u548C\u6309\u94AE\u540C\u6B65\u79FB\u52A8"
        }];
      },
      onSelect: (item) => {
        closeDialog();
        item.value === "width" ? widthSize() : heightSize();
      }
    }));
  }
  const resize = (nextWidth = api.renderer.width, nextHeight = api.renderer.height) => {
    setHeight(nextHeight);
    setWidth(nextWidth);
  };
  let refresh;
  const watcher = watch2(booksDir, (_event, filename) => {
    const current = book();
    if (!current || filename?.toString() !== basename3(current.path)) return;
    clearTimeout(refresh);
    refresh = setTimeout(() => {
      if (api.lifecycle.signal.aborted || book()?.path !== current.path) return;
      void access4(current.path).then(() => open3(current.path, true)).catch((error) => {
        if (error.code !== "ENOENT" || api.lifecycle.signal.aborted || book()?.path !== current.path) return;
        setBook(void 0);
        setOffset(0);
        api.kv.set(progressKey(current.path), 0);
        api.kv.set(prefix2 + "last", "");
      });
    }, 100);
  });
  function removeBook() {
    if (mode() === "video") return video.remove();
    const current = book();
    if (!current?.resourceId) return toast("\u8BF7\u5148\u5728\u4E66\u67B6\u6253\u5F00\u8981\u5220\u9664\u7684\u5C0F\u8BF4");
    dialog(() => _$createComponent2(api.ui.DialogConfirm, {
      title: "\u4ECE\u8D44\u6599\u5E93\u5220\u9664",
      get message() {
        return `\u5220\u9664\u300A${current.title}\u300B\u7684\u52A0\u5BC6\u526F\u672C\u548C\u91C7\u96C6\u7F13\u5B58\uFF1F\u5916\u90E8\u539F\u6587\u4EF6\u4FDD\u7559\u3002`;
      },
      onCancel: closeDialog,
      onConfirm: () => {
        closeDialog();
        void library.deleteResource(current.resourceId).then(() => {
          if (api.lifecycle.signal.aborted) return;
          api.kv.set(progressKey(current.path), 0);
          if (book()?.path === current.path) {
            api.kv.set(prefix2 + "last", "");
            setBook(void 0);
            setOffset(0);
          }
          toast("\u5DF2\u5220\u9664\u52A0\u5BC6\u526F\u672C\u548C\u91C7\u96C6\u7F13\u5B58");
        }).catch((error) => toast(String(error), "error"));
      }
    }));
  }
  api.renderer.on("resize", resize);
  api.lifecycle.onDispose(() => {
    ++request;
    watcher.close();
    clearTimeout(refresh);
    save();
    const disposing = video.dispose();
    api.renderer.off("resize", resize);
    if (ownsDialog) closeDialog();
    return disposing;
  });
  createEffect2(() => {
    if (!api.kv.ready || started) return;
    started = true;
    const savedSize = Number(api.kv.get(prefix2 + "heightPercent", null));
    if (Number.isFinite(savedSize) && savedSize >= 10 && savedSize <= 100) setHeightPercent(savedSize);
    const savedWidth = Number(api.kv.get(prefix2 + "widthPercent", null));
    if (Number.isFinite(savedWidth) && savedWidth >= 20 && savedWidth <= 60) setWidthPercent(savedWidth);
    setVisible(api.kv.get(prefix2 + "visible", true));
    if (api.kv.get(prefix2 + "mode", "novel") === "video") selectMode("video");
    const initial = typeof options?.file === "string" ? options.file : api.kv.get(prefix2 + "last", "");
    void open3(initial || resolve3(pluginRoot, "books/\u591C\u73ED\u4FBF\u5229\u5E97.txt"), true);
  });
  api.keymap.registerLayer({
    commands: [{
      name: "moyu.toggle",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u663E\u793A / \u9690\u85CF",
      category: "Moyu \u9605\u8BFB",
      namespace: "palette",
      run: toggle
    }],
    bindings: [{
      key: "alt+m",
      cmd: "moyu.toggle",
      desc: "\u663E\u793A / \u9690\u85CF\u5C0F\u8BF4"
    }]
  });
  api.keymap.registerLayer({
    mode: "base",
    commands: [{
      name: "moyu.open",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u6253\u5F00\u4E66\u67B6",
      slashName: "moyu",
      run: openMoyu
    }, {
      name: "moyu.video",
      title: "\u6478\u9C7C\u89C6\u9891\uFF1A\u6253\u5F00\u89C6\u9891\u5E93",
      slashName: "video",
      run: () => {
        selectMode("video");
        setVisible(true);
        return video.shelf();
      }
    }, {
      name: "moyu.shelf",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u4E66\u67B6 / \u6253\u5F00\u6587\u4EF6",
      slashName: "read",
      run: shelf
    }, {
      name: "moyu.chapters",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u7AE0\u8282\u76EE\u5F55",
      slashName: "chapters",
      run: chapters
    }, {
      name: "moyu.jump",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u8DF3\u8F6C\u8FDB\u5EA6",
      run: jump
    }, {
      name: "moyu.size",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u8C03\u6574\u9605\u8BFB\u533A\u57DF\u5927\u5C0F",
      slashName: "readsize",
      run: size
    }, {
      name: "moyu.delete",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u5220\u9664\u5F53\u524D\u8D44\u6599",
      run: removeBook
    }, {
      name: "moyu.next",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u4E0B\u4E00\u9875",
      enabled: () => visible() && api.route.current.name === "session",
      run: () => turn(1)
    }, {
      name: "moyu.prev",
      title: "\u6478\u9C7C\u9605\u8BFB\uFF1A\u4E0A\u4E00\u9875",
      enabled: () => visible() && api.route.current.name === "session",
      run: () => turn(-1)
    }].map((item) => ({
      ...item,
      category: "Moyu \u9605\u8BFB",
      namespace: "palette"
    })),
    bindings: [{
      key: "alt+o",
      cmd: "moyu.shelf",
      desc: "\u6253\u5F00\u4E66\u67B6"
    }, {
      key: "alt+c",
      cmd: "moyu.chapters",
      desc: "\u7AE0\u8282\u76EE\u5F55"
    }, {
      key: "alt+g",
      cmd: "moyu.jump",
      desc: "\u8DF3\u8F6C\u8FDB\u5EA6"
    }, {
      key: "<leader>j",
      cmd: "moyu.size",
      desc: "\u8C03\u6574\u9605\u8BFB\u533A\u57DF\u5927\u5C0F"
    }, {
      key: "alt+d",
      cmd: "moyu.delete",
      desc: "\u5220\u9664\u5F53\u524D\u8D44\u6599"
    }, {
      key: "alt+right",
      cmd: "moyu.next",
      desc: "\u4E0B\u4E00\u9875"
    }, {
      key: "alt+left",
      cmd: "moyu.prev",
      desc: "\u4E0A\u4E00\u9875"
    }]
  });
  function Reader() {
    let viewport;
    let readerNode;
    let docking;
    let mountTimer;
    const [layout, setLayout] = createSignal2();
    const measure = () => {
      if (viewport && !viewport.isDestroyed && Number.isFinite(viewport.height) && viewport.height > 0) setViewportHeight(viewport.height);
    };
    const applyWidth = () => layout()?.apply(visible() ? widthPercent() : void 0, width());
    const frameResized = () => queueMicrotask(() => {
      if (!api.lifecycle.signal.aborted) applyWidth();
    });
    createEffect2(applyWidth);
    const dock = () => {
      if (options?.hostMajor !== 2 || api.lifecycle.signal.aborted) return;
      measure();
      if (visible() && readerNode && !readerNode.isDestroyed && viewport && !docking) docking = sidebarDock(readerNode, viewport, dock);
      setHostRows(docking?.measure(visible()) ?? 0);
      if (!visible()) docking = void 0;
    };
    createEffect2(dock);
    api.renderer.on("frame", dock);
    onMount(() => {
      mountTimer = setTimeout(() => {
        if (readerNode && !readerNode.isDestroyed) {
          observe(readerNode);
          dock();
        }
      }, 0);
    });
    function observe(node) {
      if (options?.hostMajor !== 2) return;
      if (viewport) return;
      for (let parent = node.parent; parent; parent = parent.parent) {
        if (!(parent instanceof ScrollBoxRenderable)) continue;
        viewport = parent.viewport;
        const sizing = sidebarLayout(parent);
        setLayout(sizing);
        sizing?.frame?.on("resized", frameResized);
        viewport.on("resized", measure);
        measure();
        dock();
        break;
      }
    }
    onCleanup2(() => {
      video.pause();
      clearTimeout(mountTimer);
      viewport?.off("resized", measure);
      layout()?.frame?.off("resized", frameResized);
      layout()?.restore();
      api.renderer.off("frame", dock);
      docking?.restore();
    });
    const theme = () => api.theme.current;
    const gap = () => height() < 40 ? 0 : 1;
    const percentage = () => page() === pages().length - 1 ? 100 : Math.floor(pages()[page()].start / (book()?.text.length || 1) * 100);
    function Button(props) {
      let pressed = false;
      const click = (event) => {
        const activate = pressed && event.button === 0 && !event.isDragging;
        pressed = false;
        if (!activate) return;
        event.preventDefault();
        event.stopPropagation();
        queueMicrotask(() => {
          if (!api.lifecycle.signal.aborted) props.action();
        });
      };
      return (() => {
        var _el$ = _$createElement2("text");
        _$setProp2(_el$, "selectable", false);
        _$setProp2(_el$, "wrapMode", "none");
        _$setProp2(_el$, "onMouseDown", (event) => {
          if (event.button === 0) {
            pressed = true;
            event.preventDefault();
            event.stopPropagation();
          }
        });
        _$setProp2(_el$, "onMouseOut", () => {
          pressed = false;
        });
        _$setProp2(_el$, "onMouseDrag", () => {
          pressed = false;
        });
        _$setProp2(_el$, "onMouseUp", click);
        _$insert2(_el$, () => props.label);
        _$effect2((_$p) => _$setProp2(_el$, "fg", props.muted ? theme().textMuted : theme().primary, _$p));
        return _el$;
      })();
    }
    return _$createComponent2(Show2, {
      get when() {
        return visible();
      },
      get fallback() {
        return (() => {
          var _el$16 = _$createElement2("box");
          _$setProp2(_el$16, "height", 1);
          _$insert2(_el$16, _$createComponent2(Button, {
            label: "[\u663E\u793A\u9605\u8BFB]",
            action: toggle
          }));
          return _el$16;
        })();
      },
      get children() {
        var _el$2 = _$createElement2("box"), _el$3 = _$createElement2("box"), _el$4 = _$createElement2("text"), _el$5 = _$createElement2("b"), _el$7 = _$createElement2("box"), _el$8 = _$createElement2("box"), _el$9 = _$createElement2("box");
        _$insertNode2(_el$2, _el$3);
        _$insertNode2(_el$2, _el$8);
        _$insertNode2(_el$2, _el$9);
        _$use2((node) => {
          readerNode = node;
        }, _el$2);
        _$setProp2(_el$2, "flexShrink", 0);
        _$setProp2(_el$2, "width", "100%");
        _$setProp2(_el$2, "onSizeChange", function() {
          readerNode = this;
          setBodyWidth(Math.max(2, Math.floor(this.width)));
          observe(this);
          dock();
        });
        _$insertNode2(_el$3, _el$4);
        _$insertNode2(_el$3, _el$7);
        _$setProp2(_el$3, "flexShrink", 0);
        _$setProp2(_el$3, "height", 1);
        _$setProp2(_el$3, "flexDirection", "row");
        _$setProp2(_el$3, "justifyContent", "space-between");
        _$insertNode2(_el$4, _el$5);
        _$insertNode2(_el$5, _$createTextNode2(`\u968F\u624B\u8BFB`));
        _$setProp2(_el$7, "flexDirection", "row");
        _$setProp2(_el$7, "gap", 1);
        _$insert2(_el$7, _$createComponent2(Button, {
          label: "[\u5C0F\u8BF4]",
          action: () => selectMode("novel"),
          get muted() {
            return mode() !== "novel";
          }
        }), null);
        _$insert2(_el$7, _$createComponent2(Button, {
          label: "[\u89C6\u9891]",
          action: () => selectMode("video"),
          get muted() {
            return mode() !== "video";
          }
        }), null);
        _$insert2(_el$7, _$createComponent2(Button, {
          label: "[\u9690\u85CF]",
          action: toggle,
          muted: true
        }), null);
        _$setProp2(_el$8, "flexShrink", 0);
        _$setProp2(_el$8, "height", 1);
        _$setProp2(_el$8, "flexDirection", "row");
        _$setProp2(_el$8, "gap", 2);
        _$insert2(_el$8, _$createComponent2(Button, {
          get label() {
            return mode() === "video" ? "[\u89C6\u9891\u5E93]" : "[\u4E66\u67B6]";
          },
          action: () => mode() === "video" ? video.shelf() : shelf()
        }), null);
        _$insert2(_el$8, _$createComponent2(Button, {
          get label() {
            return mode() === "video" ? "[\u641C\u7D22]" : "[\u76EE\u5F55]";
          },
          action: () => mode() === "video" ? video.search() : chapters()
        }), null);
        _$insert2(_el$8, _$createComponent2(Show2, {
          get when() {
            return mode() === "video";
          },
          get children() {
            return _$createComponent2(Button, {
              label: "[\u70ED\u95E8]",
              action: () => video.popular()
            });
          }
        }), null);
        _$insert2(_el$8, _$createComponent2(Button, {
          label: "[\u5220\u9664]",
          action: removeBook
        }), null);
        _$setProp2(_el$9, "flexShrink", 0);
        _$setProp2(_el$9, "flexDirection", "row");
        _$setProp2(_el$9, "gap", 2);
        _$insert2(_el$9, _$createComponent2(Show2, {
          get when() {
            return options?.hostMajor === 2;
          },
          get children() {
            return _$createComponent2(Button, {
              get label() {
                return `[\u5BBD\u5EA6 ${widthPercent() ?? "\u81EA\u52A8"}${widthPercent() === void 0 ? "" : "%"}]`;
              },
              action: widthSize
            });
          }
        }), null);
        _$insert2(_el$9, _$createComponent2(Button, {
          get label() {
            return `[\u9AD8\u5EA6 ${heightPercent() ?? "\u81EA\u52A8"}${heightPercent() === void 0 ? "" : "%"}]`;
          },
          action: heightSize
        }), null);
        _$insert2(_el$2, _$createComponent2(Show2, {
          get when() {
            return mode() === "novel";
          },
          get fallback() {
            return _$createComponent2(video.View, {
              Button,
              get gap() {
                return gap();
              }
            });
          },
          get children() {
            return _$createComponent2(Show2, {
              get when() {
                return book();
              },
              get fallback() {
                return _$createComponent2(Button, {
                  get label() {
                    return busy() ? "\u6B63\u5728\u6253\u5F00\u2026" : "[\u70B9\u51FB\u6253\u5F00\u672C\u5730\u5C0F\u8BF4]";
                  },
                  action: shelf
                });
              },
              get children() {
                return [(() => {
                  var _el$0 = _$createElement2("box");
                  _$setProp2(_el$0, "flexShrink", 0);
                  _$insert2(_el$0, _$createComponent2(Button, {
                    get label() {
                      return book()?.title ?? "";
                    },
                    action: shelf,
                    muted: true
                  }), null);
                  _$insert2(_el$0, _$createComponent2(Button, {
                    get label() {
                      return currentChapter();
                    },
                    action: chapters
                  }), null);
                  _$effect2((_$p) => _$setProp2(_el$0, "height", 2 + gap(), _$p));
                  return _el$0;
                })(), (() => {
                  var _el$1 = _$createElement2("box"), _el$10 = _$createElement2("text");
                  _$insertNode2(_el$1, _el$10);
                  _$setProp2(_el$1, "flexShrink", 0);
                  _$setProp2(_el$10, "width", "100%");
                  _$setProp2(_el$10, "height", "100%");
                  _$setProp2(_el$10, "wrapMode", "none");
                  _$insert2(_el$10, () => pages()[page()].text);
                  _$effect2((_p$) => {
                    var _v$ = rows(), _v$2 = rows(), _v$3 = theme().text;
                    _v$ !== _p$.e && (_p$.e = _$setProp2(_el$1, "height", _v$, _p$.e));
                    _v$2 !== _p$.t && (_p$.t = _$setProp2(_el$1, "minHeight", _v$2, _p$.t));
                    _v$3 !== _p$.a && (_p$.a = _$setProp2(_el$10, "fg", _v$3, _p$.a));
                    return _p$;
                  }, {
                    e: void 0,
                    t: void 0,
                    a: void 0
                  });
                  return _el$1;
                })(), (() => {
                  var _el$11 = _$createElement2("box"), _el$12 = _$createElement2("box"), _el$13 = _$createElement2("box"), _el$14 = _$createElement2("text");
                  _$insertNode2(_el$11, _el$12);
                  _$insertNode2(_el$11, _el$13);
                  _$insertNode2(_el$11, _el$14);
                  _$setProp2(_el$11, "flexShrink", 0);
                  _$setProp2(_el$12, "flexShrink", 0);
                  _$setProp2(_el$12, "height", 1);
                  _$setProp2(_el$12, "flexDirection", "row");
                  _$setProp2(_el$12, "justifyContent", "space-between");
                  _$insert2(_el$12, _$createComponent2(Button, {
                    get label() {
                      return `${page() + 1} / ${pages().length} \u9875 \xB7 ${percentage()}%`;
                    },
                    action: jump,
                    muted: true
                  }));
                  _$setProp2(_el$13, "flexShrink", 0);
                  _$setProp2(_el$13, "height", 1);
                  _$setProp2(_el$13, "flexDirection", "row");
                  _$setProp2(_el$13, "justifyContent", "space-between");
                  _$insert2(_el$13, _$createComponent2(Button, {
                    label: "[\u2039 \u4E0A\u4E00\u9875]",
                    action: () => turn(-1)
                  }), null);
                  _$insert2(_el$13, _$createComponent2(Button, {
                    label: "[\u4E0B\u4E00\u9875 \u203A]",
                    action: () => turn(1)
                  }), null);
                  _$insertNode2(_el$14, _$createTextNode2(`\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u8C03\u6574\u5BBD\u9AD8`));
                  _$setProp2(_el$14, "height", 1);
                  _$setProp2(_el$14, "wrapMode", "none");
                  _$effect2((_p$) => {
                    var _v$4 = 4 + gap(), _v$5 = gap(), _v$6 = theme().textMuted;
                    _v$4 !== _p$.e && (_p$.e = _$setProp2(_el$11, "height", _v$4, _p$.e));
                    _v$5 !== _p$.t && (_p$.t = _$setProp2(_el$11, "paddingTop", _v$5, _p$.t));
                    _v$6 !== _p$.a && (_p$.a = _$setProp2(_el$14, "fg", _v$6, _p$.a));
                    return _p$;
                  }, {
                    e: void 0,
                    t: void 0,
                    a: void 0
                  });
                  return _el$11;
                })()];
              }
            });
          }
        }), null);
        _$effect2((_p$) => {
          var _v$7 = options?.hostMajor === 2 ? "auto" : 0, _v$8 = book() || mode() === "video" ? rows() + chromeRows() : void 0, _v$9 = theme().text, _v$0 = 1 + gap();
          _v$7 !== _p$.e && (_p$.e = _$setProp2(_el$2, "marginBottom", _v$7, _p$.e));
          _v$8 !== _p$.t && (_p$.t = _$setProp2(_el$2, "height", _v$8, _p$.t));
          _v$9 !== _p$.a && (_p$.a = _$setProp2(_el$4, "fg", _v$9, _p$.a));
          _v$0 !== _p$.o && (_p$.o = _$setProp2(_el$9, "height", _v$0, _p$.o));
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        });
        return _el$2;
      }
    });
  }
  api.slots.register({
    order: 50,
    slots: {
      sidebar_content: () => _$createComponent2(Reader, {})
    }
  });
};
var index_default = {
  id: "opencode-moyu",
  tui
};

// src/ui/collect.mjs
function collectionQuery(input) {
  return typeof input === "string" ? input.trim().replace(/^\/?moyu(?:\s+|$)/iu, "").trim() : "";
}
function collectionPrompt(query) {
  return `\u91C7\u96C6\u5C0F\u8BF4\uFF1A${query.replace(/\s+/gu, " ")}`;
}
async function requestCollection(host, input) {
  const query = collectionQuery(input);
  if (!query || query.length > 2e3) throw new Error("\u8BF7\u8F93\u5165 1\u20132000 \u5B57\u7684\u4E66\u540D\u3001\u4F5C\u8005\u6216\u5C0F\u8BF4\u76EE\u5F55\u94FE\u63A5");
  const selected = host.ui.model.current();
  if (!selected) throw new Error("\u8BF7\u5148\u5728 OpenCode \u4E2D\u9009\u62E9\u53EF\u7528\u6A21\u578B");
  const model = { providerID: selected.providerID, id: selected.modelID, ...selected.variant ? { variant: selected.variant } : {} };
  const route = host.ui.router.current();
  const session = await host.client.session.create({ title: `Moyu \xB7 ${query.slice(0, 50)}`, location: host.location ?? host.data.location.default(), model, metadata: { origin: "moyu", ...route.type === "session" ? { sourceSessionID: route.sessionID } : {} } });
  const sessionID = session.id;
  host.ui.router.navigate({ type: "session", sessionID });
  await host.client.session.prompt({ sessionID, text: collectionPrompt(query), delivery: "queue", metadata: { origin: "moyu", query } });
  return sessionID;
}

// src/ui/v2.ts
var v2_default = Plugin.define({
  id: "opencode-moyu",
  async setup(context) {
    const abort = new AbortController();
    const cleanup = [];
    const [state, update] = context.storage.store("reader", { initial: { values: {} } });
    const writes = /* @__PURE__ */ new Set();
    let dialogGeneration = 0;
    let onClose;
    const finish = () => {
      const callback = onClose;
      onClose = void 0;
      callback?.();
    };
    function clear() {
      ++dialogGeneration;
      context.ui.dialog.clear();
      finish();
    }
    function prompt(props) {
      const generation = dialogGeneration;
      void context.ui.dialog.prompt({ title: props.title, placeholder: props.placeholder }).then((value) => {
        if (generation !== dialogGeneration || abort.signal.aborted) return;
        finish();
        if (value === void 0) props.onCancel?.();
        else props.onConfirm?.(value);
      });
      return null;
    }
    function select(props) {
      const generation = dialogGeneration;
      const options = props.options.map(({ title, value, description }) => ({ title, value, description }));
      void context.ui.dialog.select({ title: props.title, placeholder: props.placeholder, options, current: props.current }).then((value) => {
        if (generation !== dialogGeneration || abort.signal.aborted) return;
        finish();
        const option = props.options.find((item) => item.value === value);
        if (option) props.onSelect?.(option);
      });
      return null;
    }
    function confirm(props) {
      const generation = dialogGeneration;
      void context.ui.dialog.confirm({ title: props.title, message: props.message }).then((value) => {
        if (generation !== dialogGeneration || abort.signal.aborted) return;
        finish();
        if (value) props.onConfirm?.();
        else props.onCancel?.();
      });
      return null;
    }
    async function collect(query) {
      try {
        const sessionID = await requestCollection(context, query);
        context.ui.toast.show({ title: "\u6478\u9C7C\u91C7\u96C6", message: "\u5DF2\u4EA4\u7ED9\u5F53\u524D\u6A21\u578B\uFF0C\u91C7\u96C6\u7ED3\u679C\u5C06\u5728\u4F1A\u8BDD\u4E2D\u663E\u793A", variant: "info" });
        return sessionID;
      } catch (error) {
        context.ui.toast.show({ title: "\u91C7\u96C6\u8BF7\u6C42\u5931\u8D25", message: error instanceof Error ? error.message : String(error), variant: "error" });
      }
    }
    const bridge = {
      moyu: { collect },
      renderer: context.renderer,
      theme: { get current() {
        return { text: context.theme.text.base, textMuted: context.theme.text.muted, primary: context.theme.text.action.primary.base };
      } },
      kv: {
        ready: true,
        get(key, fallback) {
          return state.values[key] ?? fallback;
        },
        set(key, value) {
          const pending = update((draft) => {
            draft.values[key] = value;
          });
          writes.add(pending);
          void pending.catch((error) => context.ui.toast.show({ message: `\u9605\u8BFB\u8FDB\u5EA6\u4FDD\u5B58\u5931\u8D25\uFF1A${error}`, variant: "error" })).finally(() => writes.delete(pending));
        }
      },
      state: { path: { directory: context.location?.directory }, provider: [] },
      route: { get current() {
        return { name: context.ui.router.current().type };
      } },
      lifecycle: { signal: abort.signal, onDispose(callback) {
        cleanup.push(callback);
      } },
      ui: {
        toast: context.ui.toast.show,
        DialogPrompt: prompt,
        DialogSelect: select,
        DialogConfirm: confirm,
        dialog: {
          clear,
          replace(render, callback) {
            clear();
            onClose = callback;
            render();
          }
        }
      },
      keymap: {
        registerLayer(layer) {
          context.keymap.layer(() => ({
            // Slash completion and the palette push their own input mode. Keep
            // command discovery global, but pass modal keyboard events through.
            mode: "global",
            commands: layer.commands?.map((command) => ({
              id: command.name,
              title: command.title,
              group: command.category,
              palette: true,
              enabled: command.enabled,
              run: (input, event) => {
                if (event && layer.mode === "base" && context.keymap.mode.current() !== "base") return false;
                event?.preventDefault();
                event?.stopPropagation();
                if (command.slashName === "moyu" && collectionQuery(input)) return collect(input).then(() => {
                });
                return command.run();
              },
              bind: layer.bindings?.find((binding) => binding.cmd === command.name)?.key,
              slash: command.slashName ? { name: command.slashName, ...command.slashName === "moyu" ? { arguments: true } : {} } : void 0
            }))
          }));
        }
      },
      slots: {
        register(registration) {
          cleanup.push(context.ui.slot({ prepend: "sidebar.content", render: registration.slots.sidebar_content }));
        }
      }
    };
    await index_default.tui(bridge, { ...context.options, hostMajor: 2 }, {});
    return async () => {
      abort.abort();
      for (const dispose of cleanup.reverse()) await dispose();
      await Promise.allSettled([...writes]);
    };
  }
});
export {
  v2_default as default
};
