export const fallbackCopy = async (url, onSuccess) => {
    await navigator.clipboard.writeText(url);
    onSuccess();
};

export const buildShareData = (blog, blogDetail) => ({
    title: blog?.title,
    text: blogDetail?.seoDescription || blog?.summary,
    url: window.location.href,
});