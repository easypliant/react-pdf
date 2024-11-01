import renderNode from "./primitives/renderNode";
import addMetadata from "./operations/addMetadata";
import addBookmarks from "./operations/addBookmarks";
import addAttachments from "./operations/addAttachments";

const render = (ctx, doc) => {
  const pages = doc.children || [];
  const options = { imageCache: new Map() };

  addMetadata(ctx, doc);

  pages.forEach((page) => renderNode(ctx, page, options));

  addBookmarks(ctx, doc);
  addAttachments(ctx, doc);

  ctx.end();

  return ctx;
};

export default render;
