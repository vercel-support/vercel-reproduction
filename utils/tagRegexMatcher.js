export const createLinkCaption = (caption) => {
  if (!caption.length > 0) return caption;

  caption = caption.replace(
    /(?:@)([^\x00-\x7F]|\w(?:(?:[^\x00-\x7F]|\w|(?:\.(?!\.))){0,28}(?:[^\x00-\x7F]|\w))?)/g,
    '<a href="/profile/$1">@$1</a>'
  );
  caption = caption.replace(
    /(?:#)([^\x00-\x7F]|\w(?:(?:[^\x00-\x7F]|\w|(?:\.(?!\.))){0,28}(?:[^\x00-\x7F]|\w))?)/g,
    '<a href="/tag/$1">#$1</a>'
  );
  return caption;
};
