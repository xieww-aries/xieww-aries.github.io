import { MapFeature } from './shared/geo';

export interface RegionFact {
	label: string;
	value: string;
}

export interface RegionInfo {
	name: string;
	sub: string;
	facts: RegionFact[];
}

export interface MapDataset {
	id: string;
	tab: string;
	title: string;
	desc: string;
	file: string;
	source: string;
	projectionLabel: string;
	standardParallel: number;
	graticule: { lonStep: number; latStep: number } | null;
	minLabelArea: number;
	labelSize: number;
	labelFor: (feature: MapFeature) => string;
	describe: (feature: MapFeature) => RegionInfo;
}

const CHINA_SUFFIXES = ['维吾尔自治区', '壮族自治区', '回族自治区', '特别行政区', '自治区', '省', '市'];

const WORLD_NAME_ZH: Record<string, string> = {
	Afghanistan: '阿富汗',
	Albania: '阿尔巴尼亚',
	Algeria: '阿尔及利亚',
	Angola: '安哥拉',
	Antarctica: '南极洲',
	Argentina: '阿根廷',
	Armenia: '亚美尼亚',
	Australia: '澳大利亚',
	Austria: '奥地利',
	Azerbaijan: '阿塞拜疆',
	Bahamas: '巴哈马',
	Bangladesh: '孟加拉国',
	Belarus: '白俄罗斯',
	Belgium: '比利时',
	Belize: '伯利兹',
	Benin: '贝宁',
	Bhutan: '不丹',
	Bolivia: '玻利维亚',
	'Bosnia and Herz.': '波斯尼亚和黑塞哥维那',
	Botswana: '博茨瓦纳',
	Brazil: '巴西',
	Brunei: '文莱',
	Bulgaria: '保加利亚',
	'Burkina Faso': '布基纳法索',
	Burundi: '布隆迪',
	Cambodia: '柬埔寨',
	Cameroon: '喀麦隆',
	Canada: '加拿大',
	'Central African Rep.': '中非共和国',
	Chad: '乍得',
	Chile: '智利',
	China: '中国',
	Colombia: '哥伦比亚',
	Congo: '刚果共和国',
	'Costa Rica': '哥斯达黎加',
	Croatia: '克罗地亚',
	Cuba: '古巴',
	Cyprus: '塞浦路斯',
	Czechia: '捷克',
	'Côte d\'Ivoire': '科特迪瓦',
	'Dem. Rep. Congo': '刚果民主共和国',
	Denmark: '丹麦',
	Djibouti: '吉布提',
	'Dominican Rep.': '多米尼加共和国',
	Ecuador: '厄瓜多尔',
	Egypt: '埃及',
	'El Salvador': '萨尔瓦多',
	'Eq. Guinea': '赤道几内亚',
	Eritrea: '厄立特里亚',
	Estonia: '爱沙尼亚',
	eSwatini: '埃斯瓦蒂尼',
	Ethiopia: '埃塞俄比亚',
	'Falkland Is.': '福克兰群岛（马尔维纳斯）',
	Fiji: '斐济',
	Finland: '芬兰',
	France: '法国',
	'Fr. S. Antarctic Lands': '法属南部和南极领地',
	Gabon: '加蓬',
	Gambia: '冈比亚',
	Georgia: '格鲁吉亚',
	Germany: '德国',
	Ghana: '加纳',
	Greece: '希腊',
	Greenland: '格陵兰',
	Guatemala: '危地马拉',
	Guinea: '几内亚',
	'Guinea-Bissau': '几内亚比绍',
	Guyana: '圭亚那',
	Haiti: '海地',
	Honduras: '洪都拉斯',
	Hungary: '匈牙利',
	Iceland: '冰岛',
	India: '印度',
	Indonesia: '印度尼西亚',
	Iran: '伊朗',
	Iraq: '伊拉克',
	Ireland: '爱尔兰',
	Israel: '以色列',
	Italy: '意大利',
	Jamaica: '牙买加',
	Japan: '日本',
	Jordan: '约旦',
	Kazakhstan: '哈萨克斯坦',
	Kenya: '肯尼亚',
	Kosovo: '科索沃',
	Kuwait: '科威特',
	Kyrgyzstan: '吉尔吉斯斯坦',
	Laos: '老挝',
	Latvia: '拉脱维亚',
	Lebanon: '黎巴嫩',
	Lesotho: '莱索托',
	Liberia: '利比里亚',
	Libya: '利比亚',
	Lithuania: '立陶宛',
	Luxembourg: '卢森堡',
	Macedonia: '北马其顿',
	Madagascar: '马达加斯加',
	Malawi: '马拉维',
	Malaysia: '马来西亚',
	Mali: '马里',
	Mauritania: '毛里塔尼亚',
	Mexico: '墨西哥',
	Moldova: '摩尔多瓦',
	Mongolia: '蒙古',
	Montenegro: '黑山',
	Morocco: '摩洛哥',
	Mozambique: '莫桑比克',
	Myanmar: '缅甸',
	Namibia: '纳米比亚',
	Nepal: '尼泊尔',
	Netherlands: '荷兰',
	'New Caledonia': '新喀里多尼亚',
	'New Zealand': '新西兰',
	Nicaragua: '尼加拉瓜',
	Niger: '尼日尔',
	Nigeria: '尼日利亚',
	'North Korea': '朝鲜',
	Norway: '挪威',
	Oman: '阿曼',
	Pakistan: '巴基斯坦',
	Palestine: '巴勒斯坦',
	Panama: '巴拿马',
	'Papua New Guinea': '巴布亚新几内亚',
	Paraguay: '巴拉圭',
	Peru: '秘鲁',
	Philippines: '菲律宾',
	Poland: '波兰',
	Portugal: '葡萄牙',
	'Puerto Rico': '波多黎各',
	Qatar: '卡塔尔',
	Romania: '罗马尼亚',
	Russia: '俄罗斯',
	Rwanda: '卢旺达',
	'Saudi Arabia': '沙特阿拉伯',
	Senegal: '塞内加尔',
	Serbia: '塞尔维亚',
	'Sierra Leone': '塞拉利昂',
	Slovakia: '斯洛伐克',
	Slovenia: '斯洛文尼亚',
	Somalia: '索马里',
	Somaliland: '索马里兰',
	'South Africa': '南非',
	'South Korea': '韩国',
	'S. Sudan': '南苏丹',
	Spain: '西班牙',
	'Sri Lanka': '斯里兰卡',
	Sudan: '苏丹',
	Suriname: '苏里南',
	Sweden: '瑞典',
	Switzerland: '瑞士',
	Syria: '叙利亚',
	Taiwan: '中国台湾',
	Tajikistan: '塔吉克斯坦',
	Tanzania: '坦桑尼亚',
	Thailand: '泰国',
	'Timor-Leste': '东帝汶',
	Togo: '多哥',
	'Trinidad and Tobago': '特立尼达和多巴哥',
	Tunisia: '突尼斯',
	Turkey: '土耳其',
	Turkmenistan: '土库曼斯坦',
	Uganda: '乌干达',
	Ukraine: '乌克兰',
	'United Arab Emirates': '阿拉伯联合酋长国',
	'United Kingdom': '英国',
	'United States of America': '美国',
	Uruguay: '乌拉圭',
	Uzbekistan: '乌兹别克斯坦',
	Vanuatu: '瓦努阿图',
	Venezuela: '委内瑞拉',
	Vietnam: '越南',
	'W. Sahara': '西撒哈拉',
	Yemen: '也门',
	Zambia: '赞比亚',
	Zimbabwe: '津巴布韦',
	'Solomon Is.': '所罗门群岛',
	'N. Cyprus': '北塞浦路斯'
};

/**
 * 省级名称去掉行政后缀，便于在地图上排版
 */
export function shortChinaName(name: string) {
	const suffix = CHINA_SUFFIXES.filter(item => name.endsWith(item))[0];

	if (!suffix) {
		return name;
	}

	return name.slice(0, -suffix.length) || name;
}

export function countryNameZh(name: string) {
	return WORLD_NAME_ZH[name] || name;
}

/**
 * 经纬度格式化
 */
export function formatLngLat(value: unknown) {
	if (!Array.isArray(value) || value.length !== 2) {
		return '—';
	}

	const [lon, lat] = value as number[];

	return `${Math.abs(lon).toFixed(2)}°${lon >= 0 ? 'E' : 'W'} ${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'}`;
}

function numberText(value: unknown, unit = '') {
	return typeof value === 'number' ? `${value}${unit}` : '—';
}

function describeChina(feature: MapFeature): RegionInfo {
	const props = feature.properties;
	const isIslands = !props.level;

	return {
		name: props.name || feature.name,
		sub: isIslands ? '南海诸岛 · 九段线范围' : '省级行政区',
		facts: [
			{ label: '行政区划代码', value: props.adcode ? String(props.adcode) : '—' },
			{ label: '中心经纬度', value: formatLngLat(props.centroid || props.center) },
			{ label: '下辖地级单位', value: isIslands ? '—' : numberText(props.childrenNum, ' 个') },
			{ label: '轮廓顶点数', value: feature.vertices.toLocaleString('en-US') }
		]
	};
}

function describeWorld(feature: MapFeature): RegionInfo {
	const props = feature.properties;
	const english = String(props.name || feature.name);

	return {
		name: countryNameZh(english),
		sub: english,
		facts: [
			{ label: 'ISO 3166-1', value: props.iso ? String(props.iso) : '—' },
			{ label: '中心经纬度', value: formatLngLat(props.centroid) },
			{ label: '多边形数量', value: feature.polygons.length.toLocaleString('en-US') },
			{ label: '轮廓顶点数', value: feature.vertices.toLocaleString('en-US') }
		]
	};
}

export const datasets: MapDataset[] = [
	{
		id: 'china',
		tab: '中国地图',
		title: '中国省级行政区',
		desc: '34 个省级行政区加上南海诸岛，按住拖动即可平移，滚轮或双指缩放，点击省份查看详情。',
		file: 'geo/china.json',
		source: '阿里云 DataV.GeoAtlas（100000_full）',
		projectionLabel: '等距圆柱投影 · 标准纬线 35°N',
		standardParallel: 35,
		graticule: null,
		minLabelArea: 120,
		labelSize: 11,
		labelFor: feature => shortChinaName(String(feature.properties.name || feature.name)),
		describe: describeChina
	},
	{
		id: 'world',
		tab: '世界地图',
		title: '世界国家与地区',
		desc: '177 个国家与地区，同样支持拖动与缩放，放大后会自动浮现更多国名。',
		file: 'geo/world.json',
		source: 'Natural Earth 110m（world-atlas@2）',
		projectionLabel: '等距圆柱投影 · 赤道',
		standardParallel: 0,
		graticule: { lonStep: 30, latStep: 30 },
		minLabelArea: 260,
		labelSize: 10,
		labelFor: feature => countryNameZh(String(feature.properties.name || feature.name)),
		describe: describeWorld
	}
];

export const mapTips = [
	'按住拖动平移地图，滚轮或双指缩放',
	'双击地图快速放大，点击区域查看详情',
	'点击海洋可取消选中，右上角按钮可复位',
	'聚焦地图后可用方向键平移、+ / − 缩放、0 复位'
];
