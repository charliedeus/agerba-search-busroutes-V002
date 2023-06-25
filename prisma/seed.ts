import { PrismaClient } from '@prisma/client'
import { prisma } from '../prisma'

async function main() {
  const prisma = new PrismaClient()

  const cities = [
    {
      name: 'Abaíra',
      ibge_code: 2900108,
    },
    {
      name: 'Abaré',
      ibge_code: 2900207,
    },
    {
      name: 'Acajutiba',
      ibge_code: 2900306,
    },
    {
      name: 'Adustina',
      ibge_code: 2900355,
    },
    {
      name: 'Água Fria',
      ibge_code: 2900405,
    },
    {
      name: 'Aiquara',
      ibge_code: 2900603,
    },
    {
      name: 'Alagoinhas',
      ibge_code: 2900702,
    },
    {
      name: 'Alcobaça',
      ibge_code: 2900801,
    },
    {
      name: 'Almadina',
      ibge_code: 2900900,
    },
    {
      name: 'Amargosa',
      ibge_code: 2901007,
    },
    {
      name: 'Amélia Rodrigues',
      ibge_code: 2901106,
    },
    {
      name: 'América Dourada',
      ibge_code: 2901155,
    },
    {
      name: 'Anagé',
      ibge_code: 2901205,
    },
    {
      name: 'Andaraí',
      ibge_code: 2901304,
    },
    {
      name: 'Andorinha',
      ibge_code: 2901353,
    },
    {
      name: 'Angical',
      ibge_code: 2901403,
    },
    {
      name: 'Anguera',
      ibge_code: 2901502,
    },
    {
      name: 'Antas',
      ibge_code: 2901601,
    },
    {
      name: 'Antônio Cardoso',
      ibge_code: 2901700,
    },
    {
      name: 'Antônio Gonçalves',
      ibge_code: 2901809,
    },
    {
      name: 'Aporá',
      ibge_code: 2901908,
    },
    {
      name: 'Apuarema',
      ibge_code: 2901957,
    },
    {
      name: 'Araçás',
      ibge_code: 2902054,
    },
    {
      name: 'Aracatu',
      ibge_code: 2902005,
    },
    {
      name: 'Araci',
      ibge_code: 2902104,
    },
    {
      name: 'Aramari',
      ibge_code: 2902203,
    },
    {
      name: 'Arataca',
      ibge_code: 2902252,
    },
    {
      name: 'Aratuípe',
      ibge_code: 2902302,
    },
    {
      name: 'Aurelino Leal',
      ibge_code: 2902401,
    },
    {
      name: 'Baianópolis',
      ibge_code: 2902500,
    },
    {
      name: 'Baixa Grande',
      ibge_code: 2902609,
    },
    {
      name: 'Banzaê',
      ibge_code: 2902658,
    },
    {
      name: 'Barra',
      ibge_code: 2902708,
    },
    {
      name: 'Barra da Estiva',
      ibge_code: 2902807,
    },
    {
      name: 'Barra do Choça',
      ibge_code: 2902906,
    },
    {
      name: 'Barra do Mendes',
      ibge_code: 2903003,
    },
    {
      name: 'Barra do Rocha',
      ibge_code: 2903102,
    },
    {
      name: 'Barreiras',
      ibge_code: 2903201,
    },
    {
      name: 'Barro Alto',
      ibge_code: 2903235,
    },
    {
      name: 'Barro Preto',
      ibge_code: 2903300,
    },
    {
      name: 'Barrocas',
      ibge_code: 2903276,
    },
    {
      name: 'Belmonte',
      ibge_code: 2903409,
    },
    {
      name: 'Belo Campo',
      ibge_code: 2903508,
    },
    {
      name: 'Biritinga',
      ibge_code: 2903607,
    },
    {
      name: 'Boa Nova',
      ibge_code: 2903706,
    },
    {
      name: 'Boa Vista do Tupim',
      ibge_code: 2903805,
    },
    {
      name: 'Bom Jesus da Lapa',
      ibge_code: 2903904,
    },
    {
      name: 'Bom Jesus da Serra',
      ibge_code: 2903953,
    },
    {
      name: 'Boninal',
      ibge_code: 2904001,
    },
    {
      name: 'Bonito',
      ibge_code: 2904050,
    },
    {
      name: 'Boquira',
      ibge_code: 2904100,
    },
    {
      name: 'Botuporã',
      ibge_code: 2904209,
    },
    {
      name: 'Brejões',
      ibge_code: 2904308,
    },
    {
      name: 'Brejolândia',
      ibge_code: 2904407,
    },
    {
      name: 'Brotas de Macaúbas',
      ibge_code: 2904506,
    },
    {
      name: 'Brumado',
      ibge_code: 2904605,
    },
    {
      name: 'Buerarema',
      ibge_code: 2904704,
    },
    {
      name: 'Buritirama',
      ibge_code: 2904753,
    },
    {
      name: 'Caatiba',
      ibge_code: 2904803,
    },
    {
      name: 'Cabaceiras do Paraguaçu',
      ibge_code: 2904852,
    },
    {
      name: 'Cachoeira',
      ibge_code: 2904902,
    },
    {
      name: 'Caculé',
      ibge_code: 2905008,
    },
    {
      name: 'Caém',
      ibge_code: 2905107,
    },
    {
      name: 'Caetanos',
      ibge_code: 2905156,
    },
    {
      name: 'Caetité',
      ibge_code: 2905206,
    },
    {
      name: 'Cafarnaum',
      ibge_code: 2905305,
    },
    {
      name: 'Cairu',
      ibge_code: 2905404,
    },
    {
      name: 'Caldeirão Grande',
      ibge_code: 2905503,
    },
    {
      name: 'Camacan',
      ibge_code: 2905602,
    },
    {
      name: 'Camaçari',
      ibge_code: 2905701,
    },
    {
      name: 'Camamu',
      ibge_code: 2905800,
    },
    {
      name: 'Campo Alegre de Lourdes',
      ibge_code: 2905909,
    },
    {
      name: 'Campo Formoso',
      ibge_code: 2906006,
    },
    {
      name: 'Canápolis',
      ibge_code: 2906105,
    },
    {
      name: 'Canarana',
      ibge_code: 2906204,
    },
    {
      name: 'Canavieiras',
      ibge_code: 2906303,
    },
    {
      name: 'Candeal',
      ibge_code: 2906402,
    },
    {
      name: 'Candeias',
      ibge_code: 2906501,
    },
    {
      name: 'Candiba',
      ibge_code: 2906600,
    },
    {
      name: 'Cândido Sales',
      ibge_code: 2906709,
    },
    {
      name: 'Cansanção',
      ibge_code: 2906808,
    },
    {
      name: 'Canudos',
      ibge_code: 2906824,
    },
    {
      name: 'Capela do Alto Alegre',
      ibge_code: 2906857,
    },
    {
      name: 'Capim Grosso',
      ibge_code: 2906873,
    },
    {
      name: 'Caraíbas',
      ibge_code: 2906899,
    },
    {
      name: 'Caravelas',
      ibge_code: 2906907,
    },
    {
      name: 'Cardeal da Silva',
      ibge_code: 2907004,
    },
    {
      name: 'Carinhanha',
      ibge_code: 2907103,
    },
    {
      name: 'Casa Nova',
      ibge_code: 2907202,
    },
    {
      name: 'Castro Alves',
      ibge_code: 2907301,
    },
    {
      name: 'Catolândia',
      ibge_code: 2907400,
    },
    {
      name: 'Catu',
      ibge_code: 2907509,
    },
    {
      name: 'Caturama',
      ibge_code: 2907558,
    },
    {
      name: 'Central',
      ibge_code: 2907608,
    },
    {
      name: 'Chorrochó',
      ibge_code: 2907707,
    },
    {
      name: 'Cícero Dantas',
      ibge_code: 2907806,
    },
    {
      name: 'Cipó',
      ibge_code: 2907905,
    },
    {
      name: 'Coaraci',
      ibge_code: 2908002,
    },
    {
      name: 'Cocos',
      ibge_code: 2908101,
    },
    {
      name: 'Conceição da Feira',
      ibge_code: 2908200,
    },
    {
      name: 'Conceição do Almeida',
      ibge_code: 2908309,
    },
    {
      name: 'Conceição do Coité',
      ibge_code: 2908408,
    },
    {
      name: 'Conceição do Jacuípe',
      ibge_code: 2908507,
    },
    {
      name: 'Conde',
      ibge_code: 2908606,
    },
    {
      name: 'Condeúba',
      ibge_code: 2908705,
    },
    {
      name: 'Contendas do Sincorá',
      ibge_code: 2908804,
    },
    {
      name: 'Coração de Maria',
      ibge_code: 2908903,
    },
    {
      name: 'Cordeiros',
      ibge_code: 2909000,
    },
    {
      name: 'Coribe',
      ibge_code: 2909109,
    },
    {
      name: 'Coronel João Sá',
      ibge_code: 2909208,
    },
    {
      name: 'Correntina',
      ibge_code: 2909307,
    },
    {
      name: 'Cotegipe',
      ibge_code: 2909406,
    },
    {
      name: 'Cravolândia',
      ibge_code: 2909505,
    },
    {
      name: 'Crisópolis',
      ibge_code: 2909604,
    },
    {
      name: 'Cristópolis',
      ibge_code: 2909703,
    },
    {
      name: 'Cruz das Almas',
      ibge_code: 2909802,
    },
    {
      name: 'Curaçá',
      ibge_code: 2909901,
    },
    {
      name: 'Dário Meira',
      ibge_code: 2910008,
    },
    {
      name: "Dias d'Ávila",
      ibge_code: 2910057,
    },
    {
      name: 'Dom Basílio',
      ibge_code: 2910107,
    },
    {
      name: 'Dom Macedo Costa',
      ibge_code: 2910206,
    },
    {
      name: 'Elísio Medrado',
      ibge_code: 2910305,
    },
    {
      name: 'Encruzilhada',
      ibge_code: 2910404,
    },
    {
      name: 'Entre Rios',
      ibge_code: 2910503,
    },
    {
      name: 'Érico Cardoso',
      ibge_code: 2900504,
    },
    {
      name: 'Esplanada',
      ibge_code: 2910602,
    },
    {
      name: 'Euclides da Cunha',
      ibge_code: 2910701,
    },
    {
      name: 'Eunápolis',
      ibge_code: 2910727,
    },
    {
      name: 'Fátima',
      ibge_code: 2910750,
    },
    {
      name: 'Feira da Mata',
      ibge_code: 2910776,
    },
    {
      name: 'Feira de Santana',
      ibge_code: 2910800,
    },
    {
      name: 'Filadélfia',
      ibge_code: 2910859,
    },
    {
      name: 'Firmino Alves',
      ibge_code: 2910909,
    },
    {
      name: 'Floresta Azul',
      ibge_code: 2911006,
    },
    {
      name: 'Formosa do Rio Preto',
      ibge_code: 2911105,
    },
    {
      name: 'Gandu',
      ibge_code: 2911204,
    },
    {
      name: 'Gavião',
      ibge_code: 2911253,
    },
    {
      name: 'Gentio do Ouro',
      ibge_code: 2911303,
    },
    {
      name: 'Glória',
      ibge_code: 2911402,
    },
    {
      name: 'Gongogi',
      ibge_code: 2911501,
    },
    {
      name: 'Governador Mangabeira',
      ibge_code: 2911600,
    },
    {
      name: 'Guajeru',
      ibge_code: 2911659,
    },
    {
      name: 'Guanambi',
      ibge_code: 2911709,
    },
    {
      name: 'Guaratinga',
      ibge_code: 2911808,
    },
    {
      name: 'Heliópolis',
      ibge_code: 2911857,
    },
    {
      name: 'Iaçu',
      ibge_code: 2911907,
    },
    {
      name: 'Ibiassucê',
      ibge_code: 2912004,
    },
    {
      name: 'Ibicaraí',
      ibge_code: 2912103,
    },
    {
      name: 'Ibicoara',
      ibge_code: 2912202,
    },
    {
      name: 'Ibicuí',
      ibge_code: 2912301,
    },
    {
      name: 'Ibipeba',
      ibge_code: 2912400,
    },
    {
      name: 'Ibipitanga',
      ibge_code: 2912509,
    },
    {
      name: 'Ibiquera',
      ibge_code: 2912608,
    },
    {
      name: 'Ibirapitanga',
      ibge_code: 2912707,
    },
    {
      name: 'Ibirapuã',
      ibge_code: 2912806,
    },
    {
      name: 'Ibirataia',
      ibge_code: 2912905,
    },
    {
      name: 'Ibitiara',
      ibge_code: 2913002,
    },
    {
      name: 'Ibititá',
      ibge_code: 2913101,
    },
    {
      name: 'Ibotirama',
      ibge_code: 2913200,
    },
    {
      name: 'Ichu',
      ibge_code: 2913309,
    },
    {
      name: 'Igaporã',
      ibge_code: 2913408,
    },
    {
      name: 'Igrapiúna',
      ibge_code: 2913457,
    },
    {
      name: 'Iguaí',
      ibge_code: 2913507,
    },
    {
      name: 'Ilhéus',
      ibge_code: 2913606,
    },
    {
      name: 'Inhambupe',
      ibge_code: 2913705,
    },
    {
      name: 'Ipecaetá',
      ibge_code: 2913804,
    },
    {
      name: 'Ipiaú',
      ibge_code: 2913903,
    },
    {
      name: 'Ipirá',
      ibge_code: 2914000,
    },
    {
      name: 'Ipupiara',
      ibge_code: 2914109,
    },
    {
      name: 'Irajuba',
      ibge_code: 2914208,
    },
    {
      name: 'Iramaia',
      ibge_code: 2914307,
    },
    {
      name: 'Iraquara',
      ibge_code: 2914406,
    },
    {
      name: 'Irará',
      ibge_code: 2914505,
    },
    {
      name: 'Irecê',
      ibge_code: 2914604,
    },
    {
      name: 'Itabela',
      ibge_code: 2914653,
    },
    {
      name: 'Itaberaba',
      ibge_code: 2914703,
    },
    {
      name: 'Itabuna',
      ibge_code: 2914802,
    },
    {
      name: 'Itacaré',
      ibge_code: 2914901,
    },
    {
      name: 'Itaeté',
      ibge_code: 2915007,
    },
    {
      name: 'Itagi',
      ibge_code: 2915106,
    },
    {
      name: 'Itagibá',
      ibge_code: 2915205,
    },
    {
      name: 'Itagimirim',
      ibge_code: 2915304,
    },
    {
      name: 'Itaguaçu da Bahia',
      ibge_code: 2915353,
    },
    {
      name: 'Itaju do Colônia',
      ibge_code: 2915403,
    },
    {
      name: 'Itajuípe',
      ibge_code: 2915502,
    },
    {
      name: 'Itamaraju',
      ibge_code: 2915601,
    },
    {
      name: 'Itamari',
      ibge_code: 2915700,
    },
    {
      name: 'Itambé',
      ibge_code: 2915809,
    },
    {
      name: 'Itanagra',
      ibge_code: 2915908,
    },
    {
      name: 'Itanhém',
      ibge_code: 2916005,
    },
    {
      name: 'Itaparica',
      ibge_code: 2916104,
    },
    {
      name: 'Itapé',
      ibge_code: 2916203,
    },
    {
      name: 'Itapebi',
      ibge_code: 2916302,
    },
    {
      name: 'Itapetinga',
      ibge_code: 2916401,
    },
    {
      name: 'Itapicuru',
      ibge_code: 2916500,
    },
    {
      name: 'Itapitanga',
      ibge_code: 2916609,
    },
    {
      name: 'Itaquara',
      ibge_code: 2916708,
    },
    {
      name: 'Itarantim',
      ibge_code: 2916807,
    },
    {
      name: 'Itatim',
      ibge_code: 2916856,
    },
    {
      name: 'Itiruçu',
      ibge_code: 2916906,
    },
    {
      name: 'Itiúba',
      ibge_code: 2917003,
    },
    {
      name: 'Itororó',
      ibge_code: 2917102,
    },
    {
      name: 'Ituaçu',
      ibge_code: 2917201,
    },
    {
      name: 'Ituberá',
      ibge_code: 2917300,
    },
    {
      name: 'Iuiu',
      ibge_code: 2917334,
    },
    {
      name: 'Jaborandi',
      ibge_code: 2917359,
    },
    {
      name: 'Jacaraci',
      ibge_code: 2917409,
    },
    {
      name: 'Jacobina',
      ibge_code: 2917508,
    },
    {
      name: 'Jaguaquara',
      ibge_code: 2917607,
    },
    {
      name: 'Jaguarari',
      ibge_code: 2917706,
    },
    {
      name: 'Jaguaripe',
      ibge_code: 2917805,
    },
    {
      name: 'Jandaíra',
      ibge_code: 2917904,
    },
    {
      name: 'Jequié',
      ibge_code: 2918001,
    },
    {
      name: 'Jeremoabo',
      ibge_code: 2918100,
    },
    {
      name: 'Jiquiriçá',
      ibge_code: 2918209,
    },
    {
      name: 'Jitaúna',
      ibge_code: 2918308,
    },
    {
      name: 'João Dourado',
      ibge_code: 2918357,
    },
    {
      name: 'Juazeiro',
      ibge_code: 2918407,
    },
    {
      name: 'Jucuruçu',
      ibge_code: 2918456,
    },
    {
      name: 'Jussara',
      ibge_code: 2918506,
    },
    {
      name: 'Jussari',
      ibge_code: 2918555,
    },
    {
      name: 'Jussiape',
      ibge_code: 2918605,
    },
    {
      name: 'Lafaiete Coutinho',
      ibge_code: 2918704,
    },
    {
      name: 'Lagoa Real',
      ibge_code: 2918753,
    },
    {
      name: 'Laje',
      ibge_code: 2918803,
    },
    {
      name: 'Lajedão',
      ibge_code: 2918902,
    },
    {
      name: 'Lajedinho',
      ibge_code: 2919009,
    },
    {
      name: 'Lajedo do Tabocal',
      ibge_code: 2919058,
    },
    {
      name: 'Lamarão',
      ibge_code: 2919108,
    },
    {
      name: 'Lapão',
      ibge_code: 2919157,
    },
    {
      name: 'Lauro de Freitas',
      ibge_code: 2919207,
    },
    {
      name: 'Lençóis',
      ibge_code: 2919306,
    },
    {
      name: 'Licínio de Almeida',
      ibge_code: 2919405,
    },
    {
      name: 'Livramento de Nossa Senhora',
      ibge_code: 2919504,
    },
    {
      name: 'Luís Eduardo Magalhães',
      ibge_code: 2919553,
    },
    {
      name: 'Macajuba',
      ibge_code: 2919603,
    },
    {
      name: 'Macarani',
      ibge_code: 2919702,
    },
    {
      name: 'Macaúbas',
      ibge_code: 2919801,
    },
    {
      name: 'Macururé',
      ibge_code: 2919900,
    },
    {
      name: 'Madre de Deus',
      ibge_code: 2919926,
    },
    {
      name: 'Maetinga',
      ibge_code: 2919959,
    },
    {
      name: 'Maiquinique',
      ibge_code: 2920007,
    },
    {
      name: 'Mairi',
      ibge_code: 2920106,
    },
    {
      name: 'Malhada',
      ibge_code: 2920205,
    },
    {
      name: 'Malhada de Pedras',
      ibge_code: 2920304,
    },
    {
      name: 'Manoel Vitorino',
      ibge_code: 2920403,
    },
    {
      name: 'Mansidão',
      ibge_code: 2920452,
    },
    {
      name: 'Maracás',
      ibge_code: 2920502,
    },
    {
      name: 'Maragogipe',
      ibge_code: 2920601,
    },
    {
      name: 'Maraú',
      ibge_code: 2920700,
    },
    {
      name: 'Marcionílio Souza',
      ibge_code: 2920809,
    },
    {
      name: 'Mascote',
      ibge_code: 2920908,
    },
    {
      name: 'Mata de São João',
      ibge_code: 2921005,
    },
    {
      name: 'Matina',
      ibge_code: 2921054,
    },
    {
      name: 'Medeiros Neto',
      ibge_code: 2921104,
    },
    {
      name: 'Miguel Calmon',
      ibge_code: 2921203,
    },
    {
      name: 'Milagres',
      ibge_code: 2921302,
    },
    {
      name: 'Mirangaba',
      ibge_code: 2921401,
    },
    {
      name: 'Mirante',
      ibge_code: 2921450,
    },
    {
      name: 'Monte Santo',
      ibge_code: 2921500,
    },
    {
      name: 'Morpará',
      ibge_code: 2921609,
    },
    {
      name: 'Morro do Chapéu',
      ibge_code: 2921708,
    },
    {
      name: 'Mortugaba',
      ibge_code: 2921807,
    },
    {
      name: 'Mucugê',
      ibge_code: 2921906,
    },
    {
      name: 'Mucuri',
      ibge_code: 2922003,
    },
    {
      name: 'Mulungu do Morro',
      ibge_code: 2922052,
    },
    {
      name: 'Mundo Novo',
      ibge_code: 2922102,
    },
    {
      name: 'Muniz Ferreira',
      ibge_code: 2922201,
    },
    {
      name: 'Muquém do São Francisco',
      ibge_code: 2922250,
    },
    {
      name: 'Muritiba',
      ibge_code: 2922300,
    },
    {
      name: 'Mutuípe',
      ibge_code: 2922409,
    },
    {
      name: 'Nazaré',
      ibge_code: 2922508,
    },
    {
      name: 'Nilo Peçanha',
      ibge_code: 2922607,
    },
    {
      name: 'Nordestina',
      ibge_code: 2922656,
    },
    {
      name: 'Nova Canaã',
      ibge_code: 2922706,
    },
    {
      name: 'Nova Fátima',
      ibge_code: 2922730,
    },
    {
      name: 'Nova Ibiá',
      ibge_code: 2922755,
    },
    {
      name: 'Nova Itarana',
      ibge_code: 2922805,
    },
    {
      name: 'Nova Redenção',
      ibge_code: 2922854,
    },
    {
      name: 'Nova Soure',
      ibge_code: 2922904,
    },
    {
      name: 'Nova Viçosa',
      ibge_code: 2923001,
    },
    {
      name: 'Novo Horizonte',
      ibge_code: 2923035,
    },
    {
      name: 'Novo Triunfo',
      ibge_code: 2923050,
    },
    {
      name: 'Olindina',
      ibge_code: 2923100,
    },
    {
      name: 'Oliveira dos Brejinhos',
      ibge_code: 2923209,
    },
    {
      name: 'Ouriçangas',
      ibge_code: 2923308,
    },
    {
      name: 'Ourolândia',
      ibge_code: 2923357,
    },
    {
      name: 'Palmas de Monte Alto',
      ibge_code: 2923407,
    },
    {
      name: 'Palmeiras',
      ibge_code: 2923506,
    },
    {
      name: 'Paramirim',
      ibge_code: 2923605,
    },
    {
      name: 'Paratinga',
      ibge_code: 2923704,
    },
    {
      name: 'Paripiranga',
      ibge_code: 2923803,
    },
    {
      name: 'Pau Brasil',
      ibge_code: 2923902,
    },
    {
      name: 'Paulo Afonso',
      ibge_code: 2924009,
    },
    {
      name: 'Pé de Serra',
      ibge_code: 2924058,
    },
    {
      name: 'Pedrão',
      ibge_code: 2924108,
    },
    {
      name: 'Pedro Alexandre',
      ibge_code: 2924207,
    },
    {
      name: 'Piatã',
      ibge_code: 2924306,
    },
    {
      name: 'Pilão Arcado',
      ibge_code: 2924405,
    },
    {
      name: 'Pindaí',
      ibge_code: 2924504,
    },
    {
      name: 'Pindobaçu',
      ibge_code: 2924603,
    },
    {
      name: 'Pintadas',
      ibge_code: 2924652,
    },
    {
      name: 'Piraí do Norte',
      ibge_code: 2924678,
    },
    {
      name: 'Piripá',
      ibge_code: 2924702,
    },
    {
      name: 'Piritiba',
      ibge_code: 2924801,
    },
    {
      name: 'Planaltino',
      ibge_code: 2924900,
    },
    {
      name: 'Planalto',
      ibge_code: 2925006,
    },
    {
      name: 'Poções',
      ibge_code: 2925105,
    },
    {
      name: 'Pojuca',
      ibge_code: 2925204,
    },
    {
      name: 'Ponto Novo',
      ibge_code: 2925253,
    },
    {
      name: 'Porto Seguro',
      ibge_code: 2925303,
    },
    {
      name: 'Potiraguá',
      ibge_code: 2925402,
    },
    {
      name: 'Prado',
      ibge_code: 2925501,
    },
    {
      name: 'Presidente Dutra',
      ibge_code: 2925600,
    },
    {
      name: 'Presidente Jânio Quadros',
      ibge_code: 2925709,
    },
    {
      name: 'Presidente Tancredo Neves',
      ibge_code: 2925758,
    },
    {
      name: 'Queimadas',
      ibge_code: 2925808,
    },
    {
      name: 'Quijingue',
      ibge_code: 2925907,
    },
    {
      name: 'Quixabeira',
      ibge_code: 2925931,
    },
    {
      name: 'Rafael Jambeiro',
      ibge_code: 2925956,
    },
    {
      name: 'Remanso',
      ibge_code: 2926004,
    },
    {
      name: 'Retirolândia',
      ibge_code: 2926103,
    },
    {
      name: 'Riachão das Neves',
      ibge_code: 2926202,
    },
    {
      name: 'Riachão do Jacuípe',
      ibge_code: 2926301,
    },
    {
      name: 'Riacho de Santana',
      ibge_code: 2926400,
    },
    {
      name: 'Ribeira do Amparo',
      ibge_code: 2926509,
    },
    {
      name: 'Ribeira do Pombal',
      ibge_code: 2926608,
    },
    {
      name: 'Ribeirão do Largo',
      ibge_code: 2926657,
    },
    {
      name: 'Rio Real',
      ibge_code: 2927002,
    },
    {
      name: 'Rio de Contas',
      ibge_code: 2926707,
    },
    {
      name: 'Rio do Antônio',
      ibge_code: 2926806,
    },
    {
      name: 'Rio do Pires',
      ibge_code: 2926905,
    },
    {
      name: 'Rodelas',
      ibge_code: 2927101,
    },
    {
      name: 'Ruy Barbosa',
      ibge_code: 2927200,
    },
    {
      name: 'Salinas da Margarida',
      ibge_code: 2927309,
    },
    {
      name: 'Salvador',
      ibge_code: 2927408,
    },
    {
      name: 'Santa Bárbara',
      ibge_code: 2927507,
    },
    {
      name: 'Santa Brígida',
      ibge_code: 2927606,
    },
    {
      name: 'Santa Cruz Cabrália',
      ibge_code: 2927705,
    },
    {
      name: 'Santa Cruz da Vitória',
      ibge_code: 2927804,
    },
    {
      name: 'Santa Inês',
      ibge_code: 2927903,
    },
    {
      name: 'Santa Luzia',
      ibge_code: 2928059,
    },
    {
      name: 'Santa Maria da Vitória',
      ibge_code: 2928109,
    },
    {
      name: 'Santa Rita de Cássia',
      ibge_code: 2928406,
    },
    {
      name: 'Santa Terezinha',
      ibge_code: 2928505,
    },
    {
      name: 'Santaluz',
      ibge_code: 2928000,
    },
    {
      name: 'Santana',
      ibge_code: 2928208,
    },
    {
      name: 'Santanópolis',
      ibge_code: 2928307,
    },
    {
      name: 'Santo Amaro',
      ibge_code: 2928604,
    },
    {
      name: 'Santo Antônio de Jesus',
      ibge_code: 2928703,
    },
    {
      name: 'Santo Estêvão',
      ibge_code: 2928802,
    },
    {
      name: 'São Desidério',
      ibge_code: 2928901,
    },
    {
      name: 'São Domingos',
      ibge_code: 2928950,
    },
    {
      name: 'São Felipe',
      ibge_code: 2929107,
    },
    {
      name: 'São Félix',
      ibge_code: 2929008,
    },
    {
      name: 'São Félix do Coribe',
      ibge_code: 2929057,
    },
    {
      name: 'São Francisco do Conde',
      ibge_code: 2929206,
    },
    {
      name: 'São Gabriel',
      ibge_code: 2929255,
    },
    {
      name: 'São Gonçalo dos Campos',
      ibge_code: 2929305,
    },
    {
      name: 'São José da Vitória',
      ibge_code: 2929354,
    },
    {
      name: 'São José do Jacuípe',
      ibge_code: 2929370,
    },
    {
      name: 'São Miguel das Matas',
      ibge_code: 2929404,
    },
    {
      name: 'São Sebastião do Passé',
      ibge_code: 2929503,
    },
    {
      name: 'Sapeaçu',
      ibge_code: 2929602,
    },
    {
      name: 'Sátiro Dias',
      ibge_code: 2929701,
    },
    {
      name: 'Saubara',
      ibge_code: 2929750,
    },
    {
      name: 'Saúde',
      ibge_code: 2929800,
    },
    {
      name: 'Seabra',
      ibge_code: 2929909,
    },
    {
      name: 'Sebastião Laranjeiras',
      ibge_code: 2930006,
    },
    {
      name: 'Senhor do Bonfim',
      ibge_code: 2930105,
    },
    {
      name: 'Sento Sé',
      ibge_code: 2930204,
    },
    {
      name: 'Serra Dourada',
      ibge_code: 2930303,
    },
    {
      name: 'Serra Preta',
      ibge_code: 2930402,
    },
    {
      name: 'Serra do Ramalho',
      ibge_code: 2930154,
    },
    {
      name: 'Serrinha',
      ibge_code: 2930501,
    },
    {
      name: 'Serrolândia',
      ibge_code: 2930600,
    },
    {
      name: 'Simões Filho',
      ibge_code: 2930709,
    },
    {
      name: 'Sítio do Mato',
      ibge_code: 2930758,
    },
    {
      name: 'Sítio do Quinto',
      ibge_code: 2930766,
    },
    {
      name: 'Sobradinho',
      ibge_code: 2930774,
    },
    {
      name: 'Souto Soares',
      ibge_code: 2930808,
    },
    {
      name: 'Tabocas do Brejo Velho',
      ibge_code: 2930907,
    },
    {
      name: 'Tanhaçu',
      ibge_code: 2931004,
    },
    {
      name: 'Tanque Novo',
      ibge_code: 2931053,
    },
    {
      name: 'Tanquinho',
      ibge_code: 2931103,
    },
    {
      name: 'Taperoá',
      ibge_code: 2931202,
    },
    {
      name: 'Tapiramutá',
      ibge_code: 2931301,
    },
    {
      name: 'Teixeira de Freitas',
      ibge_code: 2931350,
    },
    {
      name: 'Teodoro Sampaio',
      ibge_code: 2931400,
    },
    {
      name: 'Teofilândia',
      ibge_code: 2931509,
    },
    {
      name: 'Teolândia',
      ibge_code: 2931608,
    },
    {
      name: 'Terra Nova',
      ibge_code: 2931707,
    },
    {
      name: 'Tremedal',
      ibge_code: 2931806,
    },
    {
      name: 'Tucano',
      ibge_code: 2931905,
    },
    {
      name: 'Uauá',
      ibge_code: 2932002,
    },
    {
      name: 'Ubaíra',
      ibge_code: 2932101,
    },
    {
      name: 'Ubaitaba',
      ibge_code: 2932200,
    },
    {
      name: 'Ubatã',
      ibge_code: 2932309,
    },
    {
      name: 'Uibaí',
      ibge_code: 2932408,
    },
    {
      name: 'Umburanas',
      ibge_code: 2932457,
    },
    {
      name: 'Una',
      ibge_code: 2932507,
    },
    {
      name: 'Urandi',
      ibge_code: 2932606,
    },
    {
      name: 'Uruçuca',
      ibge_code: 2932705,
    },
    {
      name: 'Utinga',
      ibge_code: 2932804,
    },
    {
      name: 'Valença',
      ibge_code: 2932903,
    },
    {
      name: 'Valente',
      ibge_code: 2933000,
    },
    {
      name: 'Várzea Nova',
      ibge_code: 2933158,
    },
    {
      name: 'Várzea da Roça',
      ibge_code: 2933059,
    },
    {
      name: 'Várzea do Poço',
      ibge_code: 2933109,
    },
    {
      name: 'Varzedo',
      ibge_code: 2933174,
    },
    {
      name: 'Vera Cruz',
      ibge_code: 2933208,
    },
    {
      name: 'Vereda',
      ibge_code: 2933257,
    },
    {
      name: 'Vitória da Conquista',
      ibge_code: 2933307,
    },
    {
      name: 'Wagner',
      ibge_code: 2933406,
    },
    {
      name: 'Wanderley',
      ibge_code: 2933455,
    },
    {
      name: 'Wenceslau Guimarães',
      ibge_code: 2933505,
    },
    {
      name: 'Xique-Xique',
      ibge_code: 2933604,
    },
  ]

  await prisma.city.createMany({
    data: cities,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
