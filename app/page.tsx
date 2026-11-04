import HomePage from './HomePage';
import { getMenu } from './menu';

export const revalidate = 60;

export default async function Home() {
  return <HomePage menu={await getMenu()} />;
}
