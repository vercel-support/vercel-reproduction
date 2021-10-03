export const uploadToKV = async ({
  type,
  key,
  value,
  location = false,
  expire = null,
}) => {
  if (!type || !key || !value) throw Error("Missing information");

  try {
    let url = encodeURIComponent(key);

    if (location) {
      let [slug, id] = key.split("/");

      url = `${encodeURIComponent(slug)}/${id}`;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    expire && headers.append("expire", expire);

    await fetch(`${process.env.WMC_KV}/${type}/${url}`, {
      headers,
      method: "POST",
      body: JSON.stringify(value),
    });
  } catch (err) {
    console.warn("UploadToKV err", err);
  }

  return;
};

export const getFromKV = async (type, key, location = false) => {
  try {
    let url = encodeURIComponent(key);

    if (location) {
      let [slug, id] = key.split("/");

      url = `${encodeURIComponent(slug)}/${id}`;
    }

    const response = await fetch(`${process.env.WMC_KV}/${type}/${url}`);

    if (!response.ok) return null;

    const json = await response.json();

    return json;
  } catch (err) {
    console.warn("GetFromKV err", err);
  }

  return null;
};
