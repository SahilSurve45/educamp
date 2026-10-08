export type CityCollege = {
  id: string;
  city: string;
  rank: number;
  name: string;
  area: string;
  website: string;
  officialDirectory: string;
  sourceStatus: "Official institute site" | "CET Cell institute directory";
};

const CET_INSTITUTE_DIRECTORY = "https://cetcell.mahacet.org/search-institute/";
const official = "Official institute site" as const;
const directory = "CET Cell institute directory" as const;

const city = (cityName: string, entries: Array<[string, string, string, CityCollege["sourceStatus"]]>) => entries.map(([name, area, website, sourceStatus], index) => ({
  id: `${cityName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
  city: cityName,
  rank: index + 1,
  name,
  area,
  website,
  officialDirectory: sourceStatus === official ? website : CET_INSTITUTE_DIRECTORY,
  sourceStatus,
}));

export const MAHARASHTRA_CITIES = ["Mumbai", "Pune", "Nagpur", "Nashik", "Chhatrapati Sambhajinagar", "Amravati", "Kolhapur", "Solapur"] as const;

export const CITY_DIRECTORY: CityCollege[] = [
  ...city("Mumbai", [
    ["Veermata Jijabai Technological Institute", "Matunga", "https://vjti.ac.in/", official],
    ["Sardar Patel Institute of Technology", "Andheri", "https://www.spit.ac.in/", official],
    ["Dwarkadas J. Sanghvi College of Engineering", "Vile Parle", "https://www.djsce.ac.in/", official],
    ["Thadomal Shahani Engineering College", "Bandra", "https://tsec.edu/", official],
    ["K.J. Somaiya College of Engineering", "Vidyavihar", "https://kjsce.somaiya.edu/", official],
  ]),
  ...city("Pune", [
    ["College of Engineering Pune Technological University", "Shivajinagar", "https://www.coeptech.ac.in/", official],
    ["Pune Institute of Computer Technology", "Dhankawadi", "https://pict.edu/", official],
    ["Vishwakarma Institute of Technology", "Bibwewadi", "https://www.vit.edu/", official],
    ["Pimpri Chinchwad College of Engineering", "Akurdi", "https://www.pccoepune.com/", official],
    ["Maharashtra Institute of Technology World Peace University", "Kothrud", "https://mitwpu.edu.in/", official],
  ]),
  ...city("Nagpur", [
    ["Visvesvaraya National Institute of Technology", "South Ambazari", "https://vnit.ac.in/", official],
    ["Yeshwantrao Chavan College of Engineering", "Wanadongri", "https://www.ycce.edu/", official],
    ["Shri Ramdeobaba College of Engineering and Management", "Katol Road", "https://www.rknec.edu/", official],
    ["Government College of Engineering", "Mankapur", "https://gcoen.ac.in/", official],
    ["G.H. Raisoni College of Engineering", "Hingna", "https://ghrce.raisoni.net/", official],
  ]),
  ...city("Nashik", [
    ["K.K. Wagh Institute of Engineering Education and Research", "Nashik Road", "https://www.kkwagh.edu.in/", official],
    ["Matoshri College of Engineering", "Eklahare", "https://www.matoshri.edu.in/", official],
    ["MET Bhujbal Knowledge City", "Adgaon", "https://www.metbhujbalknowledgecity.ac.in/", official],
    ["Sandip Institute of Technology", "Mahiravani", "https://www.sandipfoundation.org/", official],
    ["Gokhale Education Society's R.H. Sapat College", "Nashik", CET_INSTITUTE_DIRECTORY, directory],
  ]),
  ...city("Chhatrapati Sambhajinagar", [
    ["Government College of Engineering", "Jalna Road", "https://geca.ac.in/", official],
    ["Maharashtra Institute of Technology", "Beed Bypass", "https://mit.asia/", official],
    ["MGM's Jawaharlal Nehru Engineering College", "N-6 CIDCO", "https://mgmcen.ac.in/", official],
    ["CSMSS Chh. Shahu College of Engineering", "Kanchanwadi", "https://csmssengg.org/", official],
    ["Deogiri Institute of Engineering and Management Studies", "Railway Station Road", "https://dietms.org/", official],
  ]),
  ...city("Amravati", [
    ["Government College of Engineering", "Kathora Road", "https://www.gcoea.ac.in/", official],
    ["P.R. Pote Patil College of Engineering", "Amravati Camp", "https://prpotepatilcollege.com/", official],
    ["Sipna College of Engineering and Technology", "Badnera Road", "https://sipnaengg.ac.in/", official],
    ["Prof. Ram Meghe College of Engineering and Management", "Badnera", CET_INSTITUTE_DIRECTORY, directory],
    ["HVPM's College of Engineering and Technology", "Amravati", CET_INSTITUTE_DIRECTORY, directory],
  ]),
  ...city("Kolhapur", [
    ["Kolhapur Institute of Technology", "Gokul-Shirgaon", "https://www.kitcoek.in/", official],
    ["D.Y. Patil College of Engineering and Technology", "Kasaba Bawada", "https://coek.dypatilunikop.org/", official],
    ["Sanjay Ghodawat University", "Atigre", "https://www.sanjayghodawatuniversity.ac.in/", official],
    ["Tatyasaheb Kore Institute of Engineering and Technology", "Warananagar", "https://tkietwarana.ac.in/", official],
    ["Karmaveer Bhaurao Patil College of Engineering", "Varye", CET_INSTITUTE_DIRECTORY, directory],
  ]),
  ...city("Solapur", [
    ["SVERI's College of Engineering", "Pandharpur Road", "https://www.sveri.ac.in/", official],
    ["N.K. Orchid College of Engineering", "Solapur", "https://www.orchidengg.ac.in/", official],
    ["Walchand Institute of Technology", "Ashok Chowk", "https://www.witsolapur.org/", official],
    ["A.G. Patil Institute of Technology", "Solapur", CET_INSTITUTE_DIRECTORY, directory],
    ["Sangola College of Engineering", "Sangola", CET_INSTITUTE_DIRECTORY, directory],
  ]),
];

export const CITY_COUNTS = Object.fromEntries(MAHARASHTRA_CITIES.map((name) => [name, CITY_DIRECTORY.filter((item) => item.city === name).length]));
