import React, {useId} from 'react';

export default function Diagram({type,compact=false}) {
  const uid=useId().replaceAll(':','');
  const steel='#7f8d8c', dark='#475756', orange='#c66a42', water='#99c5c8';
  const stem=<><path d="M160 52V113" stroke={steel} strokeWidth="9"/><path d="M130 48h60" stroke={dark} strokeWidth="8" strokeLinecap="round"/></>;
  const seat=<><path d="M116 156h30v-20h29v20h29" fill="none" stroke={steel} strokeWidth="10"/><path d="M160 81v48" stroke={dark} strokeWidth="7"/><path d="M141 130h38" stroke={orange} strokeWidth="11" strokeLinecap="round"/></>;
  let part, flow='M27 153H100 Q116 153 128 143 Q145 132 160 144 Q177 155 193 153H288', body=<path d="M38 120h64Q160 83 218 120h64v65h-64q-58 31-116 0H38Z" fill="#e3e8e4" stroke={steel} strokeWidth="2.5"/>;
  switch(type) {
    case 'gate': case 'knife':
      part=<>{stem}<path d="M135 92h50l-8 66h-34Z" fill={orange} stroke={dark} strokeWidth="2"/><path d="M127 171h66" stroke={steel} strokeWidth="7"/></>;flow='M27 169H288';break;
    case 'ball':case 'plug':
      part=<><circle cx="160" cy="151" r="39" fill={type==='plug'?'#b8a18a':'#b5beba'} stroke={dark} strokeWidth="2"/><path d="M120 140h80v23h-80Z" fill={water} stroke={dark} strokeWidth="1.5"/><path d="M160 110V73h50" fill="none" stroke={orange} strokeWidth="9" strokeLinejoin="round"/></>;flow='M27 151H288';break;
    case 'butterfly':case 'dual':
      part=<><path d="M160 64v136" stroke={dark} strokeWidth="5"/><path d={type==='dual'?'M160 150l-27-40v80Z M160 150l27-40v80Z':'M137 113l46 76'} fill={orange} stroke={orange} strokeWidth="9"/><path d="M154 68h55" stroke={dark} strokeWidth="8"/></>;flow='M27 153H118 Q160 194 201 153H288';break;
    case 'diaphragm':case 'pinch':
      part=<>{stem}<path d="M111 123Q160 168 209 123" fill="none" stroke={orange} strokeWidth="10"/><path d="M113 184l47-32 47 32" fill="#b4beba" stroke={dark} strokeWidth="2"/></>;flow='M27 148H107 Q160 124 213 148H288';break;
    case 'needle':
      part=<>{stem}<path d="M147 100h26l-13 60Z" fill={orange} stroke={dark} strokeWidth="2"/><path d="M112 180h37v-20h22v20h37" stroke={steel} strokeWidth="8" fill="none"/></>;flow='M27 148H122Q160 180 198 148H288';break;
    case 'swing':case 'alarm':
      part=<><circle cx="130" cy="112" r="6" fill={dark}/><path d="M130 112l44 49" stroke={orange} strokeWidth="14"/><path d="M121 122v65" stroke={steel} strokeWidth="7"/>{type==='alarm'&&<path d="M185 184v30h32" stroke={orange} strokeWidth="6" fill="none"/>}</>;flow='M27 151H112Q146 183 181 152H288';break;
    case 'lift':
      part=<><path d="M160 95v35" stroke={dark} strokeWidth="7"/><path d="M139 135h42" stroke={orange} strokeWidth="12"/><path d="M113 171h30v-14h34v14h32" fill="none" stroke={steel} strokeWidth="9"/></>;break;
    case 'axial':
      part=<><path d="M118 150q30-42 64 0-34 42-64 0Z" fill={orange} stroke={dark} strokeWidth="2"/><path d="M177 150h49l-5-9-7 18-7-18-7 18-7-9" stroke={dark} strokeWidth="3" fill="none"/></>;flow='M27 150H109Q160 99 212 150H288';break;
    case 'reducing':case 'safety':
      part=<><path d="M136 63h48v55h-48Z" fill="#d9dfda" stroke={steel} strokeWidth="2"/><path d="M143 69l34 9-34 9 34 9-34 9 34 9" stroke={dark} strokeWidth="3" fill="none"/><path d="M160 115v24" stroke={dark} strokeWidth="6"/><path d="M138 141h44" stroke={orange} strokeWidth="10"/><path d="M111 172h33v-15h32v15h34" fill="none" stroke={steel} strokeWidth="8"/></>;break;
    case 'float':case 'airvac':
      part=<><path d="M97 111Q160 76 223 111v77H97Z" fill="#c4dee0" opacity=".8"/><path d="M102 143q15-9 30 0t30 0t30 0t28 0" fill="none" stroke={water} strokeWidth="3"/><circle cx="155" cy="141" r="23" fill="#f6f7f2" stroke={orange} strokeWidth="3"/><path d={type==='float'?'M172 156l34 16h24':'M155 119V88h36'} fill="none" stroke={dark} strokeWidth="4"/>{type==='airvac'&&<path d="M190 90v-43" stroke={orange} strokeWidth="3" markerEnd={`url(#${uid}o)`}/>}</>;flow='M27 170H106M215 170H288';break;
    case 'disc':case 'thermo':
      part=<><path d="M124 124h72v41h-72Z" fill="#c9d4ce" stroke={steel} strokeWidth="2"/><path d={type==='disc'?'M127 132h66':'M136 130l42 6-42 6 42 6-42 6'} stroke={orange} strokeWidth={type==='disc'?9:4} fill="none"/><path d="M160 160v24" stroke={dark} strokeWidth="5"/></>;flow='M27 152H120L140 173H209L225 152H288';break;
    case 'threeway':case 'mixing':case 'fourway':
      part=<><path d="M140 184v33h40v-33" fill="#e3e8e4" stroke={steel} strokeWidth="2"/><circle cx="160" cy="152" r="32" fill="#c3ccc5" stroke={dark} strokeWidth="2"/><path d="M131 151h29v44M160 151h28" stroke={orange} strokeWidth="13" fill="none" strokeLinejoin="round"/>{type==='fourway'&&<path d="M140 122V87h40v35" fill="#e3e8e4" stroke={steel} strokeWidth="2"/>}</>;flow=type==='mixing'?'M27 151H144M160 209V153H288':'M27 151H160V210';break;
    case 'solenoid':
      part=<><rect x="134" y="59" width="52" height="57" rx="5" fill={dark}/><path d="M144 69h32m-32 8h32m-32 8h32m-32 8h32" stroke={orange} strokeWidth="3"/><path d="M160 111v32" stroke={dark} strokeWidth="7"/><path d="M140 145h40" stroke={orange} strokeWidth="10"/>{seat}</>;break;
    case 'angle':
      part=<>{stem}{seat}<path d="M140 183v35h40v-35" fill="#e3e8e4" stroke={steel} strokeWidth="2"/></>;flow='M27 149H121Q160 149 160 185V215';break;
    case 'cage':
      part=<>{stem}<rect x="129" y="113" width="62" height="66" fill="#c4ceca" stroke={dark} strokeWidth="2"/>{[136,152,168,184].map(x=><path key={x} d={`M${x} 134v32`} stroke="#f5f6ef" strokeWidth="6"/>)}<path d="M137 129h46" stroke={orange} strokeWidth="9"/></>;break;
    default:part=<>{stem}{seat}</>;
  }
  return <svg className={`diagram ${compact?'compact':''}`} viewBox="0 0 320 260" role="img" aria-label={`${type} 工作原理示意 / operating principle schematic`}>
    <defs><pattern id={`${uid}p`} width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#d9dfd8"/></pattern><marker id={`${uid}a`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0l10 5-10 5Z" fill="#5b999d"/></marker><marker id={`${uid}o`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0l10 5-10 5Z" fill={orange}/></marker></defs>
    <rect width="320" height="260" fill="#eff2ec"/><rect width="320" height="260" fill={`url(#${uid}p)`}/>{body}{part}<path className="flow-line" d={flow} fill="none" stroke="#5b999d" strokeWidth="3" strokeDasharray="6 4" markerEnd={`url(#${uid}a)`}/><text x="20" y="237" fill="#7b8981" fontSize="9" fontFamily="monospace">FLOW →</text><text x="300" y="237" textAnchor="end" fill="#7b8981" fontSize="8" fontFamily="monospace">SIMPLIFIED SECTION</text>
  </svg>
}
