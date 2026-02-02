import { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Compare = () => {
  const { products, compareList, toggleCompare, currency } =
    useContext(ShopContext);

  const compared = products
    .filter((p) => compareList?.includes(p._id))
    .slice(0, 2);

  const [search, setSearch] = useState("");

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        !compareList.includes(p._id),
    );
  }, [search, products, compareList]);

  const allSpecsKeys = useMemo(() => {
    const keys = new Set();
    compared.forEach((p) =>
      Object.keys(p.specs || {}).forEach((k) => keys.add(k)),
    );
    return Array.from(keys);
  }, [compared]);

  return (
    <div className="min-h-screen bg-gray-50 border-t pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <Title text1="COMPARE" text2="ITEMS" />

        {/* ================= PRODUCT SLOTS ================= */}
        <div className="bg-white rounded-3xl shadow-xl mt-10 overflow-hidden">
          {/* HEADER */}
          <div className="grid grid-cols-[220px_1fr_1fr] bg-gray-50 border-b">
            <div className="p-6 font-black text-sm uppercase tracking-widest text-gray-500">
              Specification
            </div>

            {[0, 1].map((slot) => {
              const p = compared[slot];

              return (
                <div
                  key={slot}
                  className="p-6 flex flex-col items-center gap-4 border-l"
                >
                  {p ? (
                    <>
                      <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-2xl">
                        <img
                          src={p.images?.[0]}
                          alt={p.name}
                          className="max-h-40 object-contain"
                        />
                      </div>

                      <div className="text-center">
                        <p className="font-black text-base">{p.name}</p>
                        <p className="text-emerald-600 font-black mt-1">
                          {currency}
                          {p.price}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleCompare(p._id)}
                        className="text-xs font-bold text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-48 flex items-center justify-center border-2 border-dashed rounded-2xl text-gray-400 font-bold">
                        Add Item
                      </div>

                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search item to compare..."
                        className="w-full px-4 py-3 border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      {searchResults.length > 0 && (
                        <div className="w-full max-h-56 overflow-auto border rounded-xl">
                          {searchResults.map((sp) => (
                            <button
                              key={sp._id}
                              onClick={() => {
                                toggleCompare(sp._id);
                                setSearch("");
                              }}
                              className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 text-left"
                            >
                              <img
                                src={sp.images?.[0]}
                                className="w-10 h-10 object-contain"
                              />
                              <span className="font-semibold text-sm">
                                {sp.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* ================= SPECS ================= */}
          {allSpecsKeys.map((key) => (
            <div key={key} className="grid grid-cols-[220px_1fr_1fr] border-t">
              <div className="p-5 bg-gray-50 font-bold text-sm text-gray-700">
                {key}
              </div>

              {[0, 1].map((slot) => (
                <div key={slot} className="p-5 text-center border-l text-sm">
                  {compared[slot]?.specs?.[key] || "—"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;
