import { getNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import NotesClient from './Notes.client';

interface NoteProps {
    params: Promise<{slug: string}>
}

export default async function Notes({params}: NoteProps) {
    const queryClient = new QueryClient();

    const { slug } = await params;

    const tag = slug[0] === 'all' ? undefined : slug[0];

    await queryClient.prefetchQuery({
    queryKey: ['notes', "", tag],
    queryFn:() => getNotes("", 1, tag),
  })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag}/>
        </HydrationBoundary>
    );
};