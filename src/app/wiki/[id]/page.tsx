import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import BackButton from './_components/BackButton';
import EditButton from './_components/EditButton';
import { getPost } from '@/app/wiki/[id]/_lib/getPost';
import Contents from './_components/Contents';

interface IWikiProps {
  params: {
    id: string;
  };
}

async function Wiki({ params }: IWikiProps) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['post', 'detail', id],
    queryFn: () => getPost(id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <BackButton />
        <EditButton />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <Contents />
      </HydrationBoundary>
    </div>
  );
}

export default Wiki;
