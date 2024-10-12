import React from "react";

const SkillsCard = () => {
  return (
    <div className=" mx-auto bg-white  w-[400px] h-[400px] overflow-y-scroll rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Skills Overview</div>
        <h1 className="block mt-1 text-xl leading-tight font-bold text-black">Sribabu Mandraju</h1>
        <p className="mt-2 text-gray-500">Full-Stack Developer</p>

        <div className="mt-6 space-y-4">
          {/* Skill 1 */}
          <div>
            <p className="text-gray-700 font-semibold">JavaScript</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full" style={{ width: "90%" }}></div>
            </div>
          </div>

          {/* Skill 2 */}
          <div>
            <p className="text-gray-700 font-semibold">React</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>

          {/* Skill 3 */}
          <div>
            <p className="text-gray-700 font-semibold">Node.js</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>

          {/* Skill 4 */}
          <div>
            <p className="text-gray-700 font-semibold">CSS & Tailwind</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>

          {/* Skill 5 */}
          <div>
            <p className="text-gray-700 font-semibold">Python</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full">
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
