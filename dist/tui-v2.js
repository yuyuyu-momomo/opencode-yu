var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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

// src/ui/v2.ts
import { Plugin } from "@opencode/plugin/tui";

// src/ui/index.tsx
import { memo as _$memo } from "@opentui/solid";
import { createTextNode as _$createTextNode } from "@opentui/solid";
import { insertNode as _$insertNode } from "@opentui/solid";
import { effect as _$effect } from "@opentui/solid";
import { insert as _$insert } from "@opentui/solid";
import { setProp as _$setProp } from "@opentui/solid";
import { createElement as _$createElement } from "@opentui/solid";
import { createComponent as _$createComponent } from "@opentui/solid";
import { createEffect, createMemo, createSignal, onCleanup, Show } from "solid-js";
import { ScrollBoxRenderable } from "@opentui/core";
import { dirname as dirname3, resolve as resolve3, basename as basename2 } from "node:path";
import { watch } from "node:fs";
import { access } from "node:fs/promises";
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
      for (const path of [join(this.directory, id + ".moyubook"), this.jobPath(id), join(this.internal, "resources", id + ".enc")]) {
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

// src/ui/index.tsx
var prefix = "opencode-moyu:";
var pluginRoot = resolve3(dirname3(fileURLToPath(import.meta.url)), "..");
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
  const [visible, setVisible] = createSignal(true);
  const [book, setBook] = createSignal();
  const [offset, setOffset] = createSignal(0);
  const [height, setHeight] = createSignal(api.renderer.height);
  const [width, setWidth] = createSignal(api.renderer.width);
  const [bodyWidth, setBodyWidth] = createSignal(36);
  const [busy, setBusy] = createSignal(false);
  const [heightPercent, setHeightPercent] = createSignal();
  const [widthPercent, setWidthPercent] = createSignal();
  const [viewportHeight, setViewportHeight] = createSignal();
  const onboarding = createMemo(() => options?.hostMajor === 2 || !api.kv.get("dismissed_getting_started", false) && !api.state.provider.some((provider) => provider.id !== "opencode" || Object.values(provider.models).some((model) => model.cost?.input !== 0)));
  const chromeRows = () => height() < 40 ? 8 : 11;
  const availableRows = createMemo(() => Math.max(4, viewportHeight() === void 0 ? height() - (onboarding() ? 31 : 20) : viewportHeight() - chromeRows()));
  const rows = createMemo(() => heightPercent() === void 0 ? Math.min(fixedRows ?? 24, availableRows()) : Math.max(4, Math.floor(availableRows() * heightPercent() / 100)));
  const pages = createMemo(() => paginate(book()?.text ?? "", bodyWidth(), rows()));
  const page = createMemo(() => pageAt(pages(), offset()));
  const currentChapter = createMemo(() => book()?.chapters.findLast((item) => item.offset <= offset())?.title ?? "\u6B63\u6587");
  let request = 0;
  let ownsDialog = false;
  let started = false;
  const progressKey = (path) => prefix + "position:" + createHash3("sha256").update(path).digest("hex");
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
  async function open2(path, quiet = false) {
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
      api.kv.set(prefix + "last", next.path);
      if (!quiet) {
        setVisible(true);
        api.kv.set(prefix + "visible", true);
        if (api.route.current.name !== "session") toast("\u5DF2\u6253\u5F00\uFF0C\u8FDB\u5165\u4F1A\u8BDD\u540E\u53EF\u5728\u53F3\u4FA7\u680F\u9605\u8BFB");
      }
    } catch (error) {
      if (token === request && !api.lifecycle.signal.aborted) toast(error instanceof Error ? error.message : String(error), "error");
    } finally {
      if (token === request) setBusy(false);
    }
  }
  function turn(direction) {
    if (!book() || busy()) return;
    const next = Math.max(0, Math.min(pages().length - 1, page() + direction));
    setOffset(pages()[next].start);
    save();
  }
  function toggle() {
    const next = !visible();
    setVisible(next);
    api.kv.set(prefix + "visible", next);
    if (!next && ownsDialog) closeDialog();
    if (next && api.route.current.name !== "session") toast("\u9605\u8BFB\u9762\u677F\u4F4D\u4E8E\u4F1A\u8BDD\u53F3\u4FA7\u680F\uFF1B\u8FDB\u5165\u4F1A\u8BDD\u540E\u663E\u793A");
  }
  function promptFile() {
    dialog(() => _$createComponent(api.ui.DialogPrompt, {
      title: "\u6253\u5F00\u5C0F\u8BF4 \xB7 \u672C\u5730 TXT / Markdown",
      placeholder: "/mnt/d/books/\u5C0F\u8BF4.txt \u6216 ~/books/\u5C0F\u8BF4.txt",
      onCancel: closeDialog,
      onConfirm: (path) => {
        closeDialog();
        void open2(path);
      }
    }));
  }
  function promptCollection() {
    dialog(() => _$createComponent(api.ui.DialogPrompt, {
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
      dialog(() => _$createComponent(api.ui.DialogSelect, {
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
          else if (item.value) void open2(String(item.value));
          else promptFile();
        }
      }));
    } catch {
      promptFile();
    }
  }
  function openMoyu() {
    setVisible(true);
    api.kv.set(prefix + "visible", true);
    return shelf();
  }
  function chapters() {
    const current = book();
    if (!current) return promptFile();
    const items = current.chapters.length ? current.chapters : chaptersOf(current.text);
    if (!items.length) return toast("\u6CA1\u6709\u8BC6\u522B\u5230\u7AE0\u8282\u6807\u9898\uFF0C\u53EF\u7528\u300C\u8DF3\u8F6C\u8FDB\u5EA6\u300D\u5B9A\u4F4D");
    dialog(() => _$createComponent(api.ui.DialogSelect, {
      get title() {
        return `${current.title} \xB7 \u76EE\u5F55`;
      },
      placeholder: "\u641C\u7D22\u7AE0\u8282",
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
    if (!book()) return promptFile();
    dialog(() => _$createComponent(api.ui.DialogPrompt, {
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
    api.kv.set(prefix + "heightPercent", percent ?? null);
    save();
  }
  function customSize() {
    dialog(() => _$createComponent(api.ui.DialogPrompt, {
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
    dialog(() => _$createComponent(api.ui.DialogSelect, {
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
    dialog(() => _$createComponent(api.ui.DialogSelect, {
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
        api.kv.set(prefix + "widthPercent", percent ?? null);
        save();
      }
    }));
  }
  function size() {
    dialog(() => _$createComponent(api.ui.DialogSelect, {
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
  const watcher = watch(booksDir, (_event, filename) => {
    const current = book();
    if (!current || filename?.toString() !== basename2(current.path)) return;
    clearTimeout(refresh);
    refresh = setTimeout(() => {
      if (api.lifecycle.signal.aborted || book()?.path !== current.path) return;
      void access(current.path).then(() => open2(current.path, true)).catch((error) => {
        if (error.code !== "ENOENT" || api.lifecycle.signal.aborted || book()?.path !== current.path) return;
        setBook(void 0);
        setOffset(0);
        api.kv.set(progressKey(current.path), 0);
        api.kv.set(prefix + "last", "");
      });
    }, 100);
  });
  function removeBook() {
    const current = book();
    if (!current?.resourceId) return;
    dialog(() => _$createComponent(api.ui.DialogConfirm, {
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
          api.kv.set(prefix + "last", "");
          setBook(void 0);
          setOffset(0);
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
    api.renderer.off("resize", resize);
    if (ownsDialog) closeDialog();
  });
  createEffect(() => {
    if (!api.kv.ready || started) return;
    started = true;
    const savedSize = Number(api.kv.get(prefix + "heightPercent", null));
    if (Number.isFinite(savedSize) && savedSize >= 10 && savedSize <= 100) setHeightPercent(savedSize);
    const savedWidth = Number(api.kv.get(prefix + "widthPercent", null));
    if (Number.isFinite(savedWidth) && savedWidth >= 20 && savedWidth <= 60) setWidthPercent(savedWidth);
    setVisible(api.kv.get(prefix + "visible", true));
    const initial = typeof options?.file === "string" ? options.file : api.kv.get(prefix + "last", "");
    void open2(initial || resolve3(pluginRoot, "books/\u591C\u73ED\u4FBF\u5229\u5E97.txt"), true);
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
    const [layout, setLayout] = createSignal();
    const measure = () => {
      if (viewport && !viewport.isDestroyed) setViewportHeight(viewport.height);
    };
    const applyWidth = () => layout()?.apply(visible() ? widthPercent() : void 0, width());
    const frameResized = () => queueMicrotask(() => {
      if (!api.lifecycle.signal.aborted) applyWidth();
    });
    createEffect(applyWidth);
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
        break;
      }
    }
    onCleanup(() => {
      viewport?.off("resized", measure);
      layout()?.frame?.off("resized", frameResized);
      layout()?.restore();
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
        var _el$ = _$createElement("text");
        _$setProp(_el$, "selectable", false);
        _$setProp(_el$, "wrapMode", "none");
        _$setProp(_el$, "onMouseDown", (event) => {
          if (event.button === 0) {
            pressed = true;
            event.preventDefault();
            event.stopPropagation();
          }
        });
        _$setProp(_el$, "onMouseOut", () => {
          pressed = false;
        });
        _$setProp(_el$, "onMouseDrag", () => {
          pressed = false;
        });
        _$setProp(_el$, "onMouseUp", click);
        _$insert(_el$, () => props.label);
        _$effect((_$p) => _$setProp(_el$, "fg", props.muted ? theme().textMuted : theme().primary, _$p));
        return _el$;
      })();
    }
    return _$createComponent(Show, {
      get when() {
        return visible();
      },
      get fallback() {
        return (() => {
          var _el$15 = _$createElement("box");
          _$setProp(_el$15, "height", 1);
          _$insert(_el$15, _$createComponent(Button, {
            label: "[\u663E\u793A\u9605\u8BFB]",
            action: toggle
          }));
          return _el$15;
        })();
      },
      get children() {
        var _el$2 = _$createElement("box"), _el$3 = _$createElement("box"), _el$4 = _$createElement("text"), _el$5 = _$createElement("b"), _el$7 = _$createElement("box"), _el$8 = _$createElement("box");
        _$insertNode(_el$2, _el$3);
        _$insertNode(_el$2, _el$8);
        _$setProp(_el$2, "flexShrink", 0);
        _$setProp(_el$2, "width", "100%");
        _$setProp(_el$2, "onSizeChange", function() {
          setBodyWidth(Math.max(2, Math.floor(this.width)));
          observe(this);
        });
        _$insertNode(_el$3, _el$4);
        _$insertNode(_el$3, _el$7);
        _$setProp(_el$3, "flexShrink", 0);
        _$setProp(_el$3, "height", 1);
        _$setProp(_el$3, "flexDirection", "row");
        _$setProp(_el$3, "justifyContent", "space-between");
        _$insertNode(_el$4, _el$5);
        _$insertNode(_el$5, _$createTextNode(`\u968F\u624B\u8BFB`));
        _$setProp(_el$7, "flexDirection", "row");
        _$setProp(_el$7, "gap", 1);
        _$insert(_el$7, _$createComponent(Button, {
          label: "[\u4E66\u67B6]",
          action: shelf
        }), null);
        _$insert(_el$7, _$createComponent(Button, {
          label: "[\u76EE\u5F55]",
          action: chapters
        }), null);
        _$insert(_el$7, _$createComponent(Button, {
          label: "[\u9690\u85CF]",
          action: toggle,
          muted: true
        }), null);
        _$setProp(_el$8, "flexShrink", 0);
        _$setProp(_el$8, "flexDirection", "row");
        _$setProp(_el$8, "gap", 2);
        _$insert(_el$8, _$createComponent(Show, {
          get when() {
            return options?.hostMajor === 2;
          },
          get children() {
            return _$createComponent(Button, {
              get label() {
                return `[\u5BBD\u5EA6 ${widthPercent() ?? "\u81EA\u52A8"}${widthPercent() === void 0 ? "" : "%"}]`;
              },
              action: widthSize
            });
          }
        }), null);
        _$insert(_el$8, _$createComponent(Button, {
          get label() {
            return `[\u9AD8\u5EA6 ${heightPercent() ?? "\u81EA\u52A8"}${heightPercent() === void 0 ? "" : "%"}]`;
          },
          action: heightSize
        }), null);
        _$insert(_el$2, _$createComponent(Show, {
          get when() {
            return book();
          },
          get fallback() {
            return _$createComponent(Button, {
              get label() {
                return busy() ? "\u6B63\u5728\u6253\u5F00\u2026" : "[\u70B9\u51FB\u6253\u5F00\u672C\u5730\u5C0F\u8BF4]";
              },
              action: shelf
            });
          },
          get children() {
            return [(() => {
              var _el$9 = _$createElement("box");
              _$setProp(_el$9, "flexShrink", 0);
              _$insert(_el$9, _$createComponent(Button, {
                get label() {
                  return book()?.title ?? "";
                },
                action: shelf,
                muted: true
              }), null);
              _$insert(_el$9, _$createComponent(Button, {
                get label() {
                  return currentChapter();
                },
                action: chapters
              }), null);
              _$effect((_$p) => _$setProp(_el$9, "height", 2 + gap(), _$p));
              return _el$9;
            })(), (() => {
              var _el$0 = _$createElement("box"), _el$1 = _$createElement("text");
              _$insertNode(_el$0, _el$1);
              _$setProp(_el$0, "flexShrink", 0);
              _$setProp(_el$1, "width", "100%");
              _$setProp(_el$1, "height", "100%");
              _$setProp(_el$1, "wrapMode", "none");
              _$insert(_el$1, () => pages()[page()].text);
              _$effect((_p$) => {
                var _v$ = rows(), _v$2 = rows(), _v$3 = theme().text;
                _v$ !== _p$.e && (_p$.e = _$setProp(_el$0, "height", _v$, _p$.e));
                _v$2 !== _p$.t && (_p$.t = _$setProp(_el$0, "minHeight", _v$2, _p$.t));
                _v$3 !== _p$.a && (_p$.a = _$setProp(_el$1, "fg", _v$3, _p$.a));
                return _p$;
              }, {
                e: void 0,
                t: void 0,
                a: void 0
              });
              return _el$0;
            })(), (() => {
              var _el$10 = _$createElement("box"), _el$11 = _$createElement("box"), _el$12 = _$createElement("box"), _el$13 = _$createElement("text");
              _$insertNode(_el$10, _el$11);
              _$insertNode(_el$10, _el$12);
              _$insertNode(_el$10, _el$13);
              _$setProp(_el$10, "flexShrink", 0);
              _$setProp(_el$11, "flexShrink", 0);
              _$setProp(_el$11, "height", 1);
              _$setProp(_el$11, "flexDirection", "row");
              _$setProp(_el$11, "justifyContent", "space-between");
              _$insert(_el$11, _$createComponent(Button, {
                get label() {
                  return `${page() + 1} / ${pages().length} \u9875 \xB7 ${percentage()}%`;
                },
                action: jump,
                muted: true
              }), null);
              _$insert(_el$11, _$createComponent(Button, {
                label: "[\u5220\u9664]",
                action: removeBook,
                muted: true
              }), null);
              _$setProp(_el$12, "flexShrink", 0);
              _$setProp(_el$12, "height", 1);
              _$setProp(_el$12, "flexDirection", "row");
              _$setProp(_el$12, "justifyContent", "space-between");
              _$insert(_el$12, _$createComponent(Button, {
                label: "[\u2039 \u4E0A\u4E00\u9875]",
                action: () => turn(-1)
              }), null);
              _$insert(_el$12, _$createComponent(Button, {
                label: "[\u4E0B\u4E00\u9875 \u203A]",
                action: () => turn(1)
              }), null);
              _$insertNode(_el$13, _$createTextNode(`\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u8C03\u6574\u5BBD\u9AD8`));
              _$setProp(_el$13, "height", 1);
              _$setProp(_el$13, "wrapMode", "none");
              _$effect((_p$) => {
                var _v$4 = 4 + gap(), _v$5 = gap(), _v$6 = theme().textMuted;
                _v$4 !== _p$.e && (_p$.e = _$setProp(_el$10, "height", _v$4, _p$.e));
                _v$5 !== _p$.t && (_p$.t = _$setProp(_el$10, "paddingTop", _v$5, _p$.t));
                _v$6 !== _p$.a && (_p$.a = _$setProp(_el$13, "fg", _v$6, _p$.a));
                return _p$;
              }, {
                e: void 0,
                t: void 0,
                a: void 0
              });
              return _el$10;
            })()];
          }
        }), null);
        _$effect((_p$) => {
          var _v$7 = book() ? rows() + chromeRows() : void 0, _v$8 = theme().text, _v$9 = 1 + gap();
          _v$7 !== _p$.e && (_p$.e = _$setProp(_el$2, "height", _v$7, _p$.e));
          _v$8 !== _p$.t && (_p$.t = _$setProp(_el$4, "fg", _v$8, _p$.t));
          _v$9 !== _p$.a && (_p$.a = _$setProp(_el$8, "height", _v$9, _p$.a));
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        });
        return _el$2;
      }
    });
  }
  api.slots.register({
    order: 50,
    slots: {
      sidebar_content: () => _$createComponent(Reader, {})
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
