export async function request<T = unknown>(
	url: string,
	config: RequestInit
): Promise<T> {
	const response = await fetch(url, config);
	return await response.json();
}
