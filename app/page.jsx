import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full flex pt-12 gap-10 flex-col items-center text-neutral-300">
      <div className="w-full">
        <h1 className="font-bold text-5xl text-center">
          Dobro dosli na <span className="text-white">DripWear.</span>
        </h1>
        <h1 className="pt-8 text-2xl text-center px-4">
          Ovde mozete poruciti vase zeljene proizvode po vrlo priustivim cenama!
        </h1>
      </div>
      <div className="flex flex-col text-5xl font-bold gap-12 items-center text-neutral-400">
        <Link
          href={"/collections/all"}
          className="hover:text-white transition-colors duration-150"
        >
          <h1>Svi nasi proizvodi</h1>
        </Link>
        <Link
          href={"/collections/clothes"}
          className="hover:text-white transition-colors duration-150"
        >
          <h1>Muska odeca</h1>
        </Link>
        <Link
          href={"/collections/fragrances"}
          className="hover:text-white transition-colors duration-150"
        >
          <h1>Parfemi</h1>
        </Link>
        <Link
          href={"/collections/headphones"}
          className="hover:text-white transition-colors duration-150"
        >
          <h1>Elektronika</h1>
        </Link>
        <Link
          href={"/collections/vapes"}
          className="hover:text-white transition-colors duration-150"
        >
          <h1>Vejpovi/Puffovi</h1>
        </Link>
        <Link
          href={"/collections/others"}
          className="hover:text-white transition-colors duration-150"
        >
          <h1>Ostalo</h1>
        </Link>
      </div>
    </main>
  );
}
