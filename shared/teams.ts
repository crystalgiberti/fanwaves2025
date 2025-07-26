export interface Team {
  id: string;
  name: string;
  city: string;
  slug: string;
  conference: string;
  division?: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  logo?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'hats', name: 'Hats & Caps', slug: 'hats', description: 'Caps, beanies, and headwear' },
  { id: 'shirts', name: 'Shirts & Tees', slug: 'shirts', description: 'T-shirts, polos, and casual wear' },
  { id: 'jerseys', name: 'Jerseys', slug: 'jerseys', description: 'Official team jerseys and replica wear' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Bags, keychains, and fan gear' },
  { id: 'ladies', name: 'Ladies Wear', slug: 'ladies', description: 'Women\'s team apparel and accessories' },
  { id: 'pants', name: 'Pants & Shorts', slug: 'pants', description: 'Bottoms, shorts, and athletic wear' },
  { id: 'outerwear', name: 'Outerwear', slug: 'outerwear', description: 'Jackets, hoodies, and warm weather gear' },
];

export const NFL_TEAMS: Team[] = [
  // AFC East
  { id: 'bills', name: 'Bills', city: 'Buffalo', slug: 'buffalo-bills', conference: 'AFC', division: 'East', colors: { primary: '#00338D', secondary: '#C60C30' } },
  { id: 'dolphins', name: 'Dolphins', city: 'Miami', slug: 'miami-dolphins', conference: 'AFC', division: 'East', colors: { primary: '#008E97', secondary: '#FC4C02' } },
  { id: 'patriots', name: 'Patriots', city: 'New England', slug: 'new-england-patriots', conference: 'AFC', division: 'East', colors: { primary: '#002244', secondary: '#C60C30' } },
  { id: 'jets', name: 'Jets', city: 'New York', slug: 'new-york-jets', conference: 'AFC', division: 'East', colors: { primary: '#125740', secondary: '#FFFFFF' } },

  // AFC North
  { id: 'ravens', name: 'Ravens', city: 'Baltimore', slug: 'baltimore-ravens', conference: 'AFC', division: 'North', colors: { primary: '#241773', secondary: '#000000' } },
  { id: 'bengals', name: 'Bengals', city: 'Cincinnati', slug: 'cincinnati-bengals', conference: 'AFC', division: 'North', colors: { primary: '#FB4F14', secondary: '#000000' } },
  { id: 'browns', name: 'Browns', city: 'Cleveland', slug: 'cleveland-browns', conference: 'AFC', division: 'North', colors: { primary: '#311D00', secondary: '#FF3C00' } },
  { id: 'steelers', name: 'Steelers', city: 'Pittsburgh', slug: 'pittsburgh-steelers', conference: 'AFC', division: 'North', colors: { primary: '#FFB612', secondary: '#000000' } },

  // AFC South
  { id: 'texans', name: 'Texans', city: 'Houston', slug: 'houston-texans', conference: 'AFC', division: 'South', colors: { primary: '#03202F', secondary: '#A71930' } },
  { id: 'colts', name: 'Colts', city: 'Indianapolis', slug: 'indianapolis-colts', conference: 'AFC', division: 'South', colors: { primary: '#002C5F', secondary: '#A2AAAD' } },
  { id: 'jaguars', name: 'Jaguars', city: 'Jacksonville', slug: 'jacksonville-jaguars', conference: 'AFC', division: 'South', colors: { primary: '#006778', secondary: '#D7A22A' } },
  { id: 'titans', name: 'Titans', city: 'Tennessee', slug: 'tennessee-titans', conference: 'AFC', division: 'South', colors: { primary: '#0C2340', secondary: '#4B92DB' } },

  // AFC West
  { id: 'broncos', name: 'Broncos', city: 'Denver', slug: 'denver-broncos', conference: 'AFC', division: 'West', colors: { primary: '#FB4F14', secondary: '#002244' } },
  { id: 'chiefs', name: 'Chiefs', city: 'Kansas City', slug: 'kansas-city-chiefs', conference: 'AFC', division: 'West', colors: { primary: '#E31837', secondary: '#FFB81C' } },
  { id: 'raiders', name: 'Raiders', city: 'Las Vegas', slug: 'las-vegas-raiders', conference: 'AFC', division: 'West', colors: { primary: '#000000', secondary: '#A5ACAF' } },
  { id: 'chargers', name: 'Chargers', city: 'Los Angeles', slug: 'los-angeles-chargers', conference: 'AFC', division: 'West', colors: { primary: '#0080C6', secondary: '#FFC20E' } },

  // NFC East
  { id: 'cowboys', name: 'Cowboys', city: 'Dallas', slug: 'dallas-cowboys', conference: 'NFC', division: 'East', colors: { primary: '#003594', secondary: '#041E42' } },
  { id: 'giants', name: 'Giants', city: 'New York', slug: 'new-york-giants', conference: 'NFC', division: 'East', colors: { primary: '#0B2265', secondary: '#A71930' } },
  { id: 'eagles', name: 'Eagles', city: 'Philadelphia', slug: 'philadelphia-eagles', conference: 'NFC', division: 'East', colors: { primary: '#004C54', secondary: '#A5ACAF' } },
  { id: 'commanders', name: 'Commanders', city: 'Washington', slug: 'washington-commanders', conference: 'NFC', division: 'East', colors: { primary: '#5A1414', secondary: '#FFB612' } },

  // NFC North
  { id: 'bears', name: 'Bears', city: 'Chicago', slug: 'chicago-bears', conference: 'NFC', division: 'North', colors: { primary: '#0B162A', secondary: '#C83803' } },
  { id: 'lions', name: 'Lions', city: 'Detroit', slug: 'detroit-lions', conference: 'NFC', division: 'North', colors: { primary: '#0076B6', secondary: '#B0B7BC' } },
  { id: 'packers', name: 'Packers', city: 'Green Bay', slug: 'green-bay-packers', conference: 'NFC', division: 'North', colors: { primary: '#203731', secondary: '#FFB612' } },
  { id: 'vikings', name: 'Vikings', city: 'Minnesota', slug: 'minnesota-vikings', conference: 'NFC', division: 'North', colors: { primary: '#4F2683', secondary: '#FFC62F' } },

  // NFC South
  { id: 'falcons', name: 'Falcons', city: 'Atlanta', slug: 'atlanta-falcons', conference: 'NFC', division: 'South', colors: { primary: '#A71930', secondary: '#000000' } },
  { id: 'panthers', name: 'Panthers', city: 'Carolina', slug: 'carolina-panthers', conference: 'NFC', division: 'South', colors: { primary: '#0085CA', secondary: '#101820' } },
  { id: 'saints', name: 'Saints', city: 'New Orleans', slug: 'new-orleans-saints', conference: 'NFC', division: 'South', colors: { primary: '#D3BC8D', secondary: '#101820' } },
  { id: 'buccaneers', name: 'Buccaneers', city: 'Tampa Bay', slug: 'tampa-bay-buccaneers', conference: 'NFC', division: 'South', colors: { primary: '#D50A0A', secondary: '#FF7900' } },

  // NFC West
  { id: 'cardinals', name: 'Cardinals', city: 'Arizona', slug: 'arizona-cardinals', conference: 'NFC', division: 'West', colors: { primary: '#97233F', secondary: '#000000' } },
  { id: 'rams', name: 'Rams', city: 'Los Angeles', slug: 'los-angeles-rams', conference: 'NFC', division: 'West', colors: { primary: '#003594', secondary: '#FFA300' } },
  { id: '49ers', name: '49ers', city: 'San Francisco', slug: 'san-francisco-49ers', conference: 'NFC', division: 'West', colors: { primary: '#AA0000', secondary: '#B3995D' } },
  { id: 'seahawks', name: 'Seahawks', city: 'Seattle', slug: 'seattle-seahawks', conference: 'NFC', division: 'West', colors: { primary: '#002244', secondary: '#69BE28' } },
];

export const NCAA_TEAMS: Team[] = [
  // Top Power 5 Schools (Sample - can be expanded)
  { id: 'alabama', name: 'Crimson Tide', city: 'Alabama', slug: 'alabama-crimson-tide', conference: 'SEC', colors: { primary: '#9E1B32', secondary: '#828A8F' } },
  { id: 'georgia', name: 'Bulldogs', city: 'Georgia', slug: 'georgia-bulldogs', conference: 'SEC', colors: { primary: '#BA0C2F', secondary: '#000000' } },
  { id: 'texas', name: 'Longhorns', city: 'Texas', slug: 'texas-longhorns', conference: 'Big 12', colors: { primary: '#BF5700', secondary: '#FFFFFF' } },
  { id: 'michigan', name: 'Wolverines', city: 'Michigan', slug: 'michigan-wolverines', conference: 'Big Ten', colors: { primary: '#00274C', secondary: '#FFCB05' } },
  { id: 'ohio-state', name: 'Buckeyes', city: 'Ohio State', slug: 'ohio-state-buckeyes', conference: 'Big Ten', colors: { primary: '#BB0000', secondary: '#C0C0C0' } },
  { id: 'clemson', name: 'Tigers', city: 'Clemson', slug: 'clemson-tigers', conference: 'ACC', colors: { primary: '#F56600', secondary: '#522D80' } },
  { id: 'notre-dame', name: 'Fighting Irish', city: 'Notre Dame', slug: 'notre-dame-fighting-irish', conference: 'Independent', colors: { primary: '#0C2340', secondary: '#C99700' } },
  { id: 'usc', name: 'Trojans', city: 'USC', slug: 'usc-trojans', conference: 'Pac-12', colors: { primary: '#990000', secondary: '#FFCC00' } },
  { id: 'penn-state', name: 'Nittany Lions', city: 'Penn State', slug: 'penn-state-nittany-lions', conference: 'Big Ten', colors: { primary: '#041E42', secondary: '#FFFFFF' } },
  { id: 'florida', name: 'Gators', city: 'Florida', slug: 'florida-gators', conference: 'SEC', colors: { primary: '#0021A5', secondary: '#FA4616' } },
  { id: 'lsu', name: 'Tigers', city: 'LSU', slug: 'lsu-tigers', conference: 'SEC', colors: { primary: '#461D7C', secondary: '#FDD023' } },
  { id: 'oklahoma', name: 'Sooners', city: 'Oklahoma', slug: 'oklahoma-sooners', conference: 'Big 12', colors: { primary: '#841617', secondary: '#FDF5E7' } },
  { id: 'oregon', name: 'Ducks', city: 'Oregon', slug: 'oregon-ducks', conference: 'Pac-12', colors: { primary: '#154733', secondary: '#FEE11A' } },
  { id: 'miami', name: 'Hurricanes', city: 'Miami', slug: 'miami-hurricanes', conference: 'ACC', colors: { primary: '#F47321', secondary: '#046A38' } },
  { id: 'wisconsin', name: 'Badgers', city: 'Wisconsin', slug: 'wisconsin-badgers', conference: 'Big Ten', colors: { primary: '#C5050C', secondary: '#FFFFFF' } },
];

export function getTeamBySlug(slug: string, league: 'nfl' | 'ncaa'): Team | undefined {
  const teams = league === 'nfl' ? NFL_TEAMS : NCAA_TEAMS;
  return teams.find(team => team.slug === slug);
}

export function getTeamsByConference(conference: string, league: 'nfl' | 'ncaa'): Team[] {
  const teams = league === 'nfl' ? NFL_TEAMS : NCAA_TEAMS;
  return teams.filter(team => team.conference === conference);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find(category => category.slug === slug);
}
