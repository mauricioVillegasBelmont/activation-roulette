export const preconnectVideo = (id: string, src: string) => {
	if (
		!id ||
		!src ||
		(document.getElementById(id) as HTMLLinkElement) ||
		(document.querySelector(`link[href="${src}"]`) as HTMLLinkElement)
	)
		return;

	const link = document.createElement("link");
	link.id = id;
	link.rel = "preconnect";
	link.href = src;

	document.head.appendChild(link);
};
