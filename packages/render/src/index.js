import renderNode from "./primitives/renderNode";
import addBookmarks from "./operations/addBookmarks";
import addAttachments from "./operations/addAttachments";

const render = (ctx, doc) => {
  const pages = doc.children || [];
  const options = { imageCache: new Map() };

  pages.forEach((page) => renderNode(ctx, page, options));

  addBookmarks(ctx, doc);
  addAttachments(ctx, doc);

  ctx.end();

  return ctx;
};

export default render;
