import React from "react";
import { CheckCircle2 } from "lucide-react";

const features = [
  { title: "Fast", desc: "Instant load, zero clutter." },
  { title: "Privacy Focused", desc: "Your notes are your notes, untraceable." },
  { title: "Quick Notes Extension", desc: "Capture ideas anywhere from your browser." },
];

function Features() {
  return (
    <div className="w-full py-16 bg-[#f6f5f4]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-left px-6">
        {features.map((f) => (
          <div key={f.title} className="space-y-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <h4 className="text-xl font-semibold">{f.title}</h4>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
