'use client';
import useSWR from 'swr';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, mutate } = useSWR('/api/incidents?resolved=false', fetcher);

  const resolveIncident = async (id: number) => {
    mutate(data.filter((i: any) => i.id !== id), false);
    await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' });
    mutate();
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4 bg-gray-900 text-white">
        <div className="text-xl font-bold mb-2">Incident Player</div>
        <div className="bg-black h-80 flex items-center justify-center">Video Frame</div>
        <div className="flex space-x-2 mt-4">
          <div className="w-24 h-16 bg-gray-700">Cam 1</div>
          <div className="w-24 h-16 bg-gray-700">Cam 2</div>
        </div>
      </div>

      <div className="w-1/3 p-4 overflow-y-scroll bg-white">
        <div className="text-xl font-bold mb-2">Incidents</div>
        {data?.map((i: any) => (
          <div key={i.id} className="border p-2 mb-2 rounded shadow transition-opacity duration-300 hover:shadow-lg">
            <img src={i.thumbnailUrl} alt="thumbnail" className="w-full h-32 object-cover rounded" />
            <div className="mt-1 font-medium text-gray-700">{i.type}</div>
            <div className="text-sm text-gray-500">Location: {i.camera.location}</div>
            <div className="text-xs">{new Date(i.tsStart).toLocaleString()} - {new Date(i.tsEnd).toLocaleTimeString()}</div>
            <button
              className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              onClick={() => resolveIncident(i.id)}>
              Resolve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}