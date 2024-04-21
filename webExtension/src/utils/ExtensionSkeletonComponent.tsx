function ExtensionSkeletonComponent() {
  return (
    <>
      <div className="animate-pulse">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl font-mono text-base text-black ">
          <div className="p-5 space-y-3 flex-col items-center">
            <h1 className="text-xl text-center">My First Extension</h1>
            <div className="flex text-center">
              <input type="radio" className="sr-only" />
              <label className="px-4 py-2 rounded-lg w-1/2 mr-1 hover:cursor-pointer border-0 bg-gray-200 opacity-50">
                Gemini
              </label>

              <input type="radio" className="sr-only" />
              <label className="px-4 py-2 rounded-lg w-1/2 mr-1 hover:cursor-pointer border-0 bg-gray-200 opacity-50">
                ChatGPT
              </label>
            </div>
            <textarea
              className="p-5 border-2 bg-slate-300 border-black rounded-lg text-base"
              rows={10}
              cols={75}
            ></textarea>
            <div className="flex flex-row items-center justify-center text-lg font-bold">
              <label className="mr-1">
                <input className="mr-1" type="radio" />
                Flujo Reflexivo
              </label>
              <label className="ml-1">
                <input className="mr-1" type="radio" />
                Flujo Multiagente
              </label>
            </div>

            <div className="grid justify-items-center">
              <button className="w-1/3 font-bold text-lg ">Enviando...</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExtensionSkeletonComponent;
