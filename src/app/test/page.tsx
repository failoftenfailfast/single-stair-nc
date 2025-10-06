export default function TestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-black mb-8">
          STYLING TEST
        </h1>
        
        <div className="bg-red-500 text-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Red Background Test</h2>
          <p>This should have a red background with white text.</p>
        </div>
        
        <div className="bg-black text-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Black Background Test</h2>
          <p>This should have a black background with white text.</p>
        </div>
        
        <div className="border-2 border-black p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-black">Border Test</h2>
          <p className="text-black">This should have a black border.</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 text-center">
            <span className="font-bold">Grid 1</span>
          </div>
          <div className="bg-gray-200 p-4 text-center">
            <span className="font-bold">Grid 2</span>
          </div>
          <div className="bg-gray-300 p-4 text-center">
            <span className="font-bold">Grid 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}








