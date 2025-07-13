import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";

interface Event {
	_id: string;
	name: string;
	slug: {
		current: string;
	};
	date: string;
}

const EVENTS_QUERY = defineQuery(`*[
  _type == "event"
  && defined(slug.current)
  && date > now()
]|order(date asc){_id, name, slug, date}`);

export default async function IndexPage() {
	const { data: events } = await sanityFetch({ query: EVENTS_QUERY });

	return (
		<main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12 dark:bg-gray-800">
			<h1 className="text-4xl font-bold tracking-tighter">Events</h1>
			<ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
				{events.map((event: Event) => (
					<li
						className="bg-white dark:bg-gray-600 p-4 rounded-lg"
						key={event._id}
					>
						<Link
							className="hover:underline"
							href={`/events/${event?.slug?.current}`}
						>
							<h2 className="text-xl font-semibold">{event?.name}</h2>
							{event?.date && (
								<p className="text-gray-500 dark:text-gray-300">
									{new Date(event.date).toLocaleDateString()}
								</p>
							)}
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
