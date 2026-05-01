import { defineConfig, loadEnv } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import handlebars from 'vite-plugin-handlebars';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgo from 'vite-plugin-svgo';
import Sitemap from 'vite-plugin-sitemap';
import { avifConvert } from './plugins/vite-plugin-avif-convert.js';
import { faviconGenerate } from './plugins/vite-plugin-favicon.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ページデータ
const pageData = {
    '/index.html': {
        title: '就活スクール | Career Launch',
        description:
            '就活スクールといえばCareer Launch。ワークライフバランスを大切にし、キャリア形成をサポートします。',
    },
    '/about.html': {
        title: '私たちについて | Career Launch',
        description:
            'Career Launchの企業情報とスタッフの紹介ページです。一人一人の個性を大切にする仲間として、あなたのキャリアをサポートします。',
    },
    '/service.html': {
        title: 'サービス | Career Launch',
        description:
            'Career Launchのサービス内容です。キャリア設計・ES添削・模擬面接・GD演習などを提供しています。',
    },

    '/news.html': {
        title: 'お知らせ | Career Launch',
        description: 'Career Launchから就活に関する情報やイベント情報をお届けします。',
    },
    '/recruit.html': {
        title: '採用情報 | Career Launch',
        description:
            'Career Launchの採用情報です。キャリアカウンセラー、講師（ES・面接対策）の募集を行っています。',
    },
    '/contact.html': {
        title: 'お問い合わせ | Career Launch',
        description: 'Career Launchへのお問い合わせフォームからお気軽にご連絡ください。',
    },
    '/404.html': {
        title: '404 | Career Launch',
        description: 'お探しのページは見つかりませんでした。',
    },
};

// newsページのお知らせ一覧
const newsData = [
    {
        url: '/news/01/',
        date: '2025.06.10',
        title: '8月の夏期集中コース申込受付開始',
    },
    {
        url: '/news/02/',
        date: '2025.06.10',
        title: '夜間模擬面接会（6月開催）参加者募集中',
    },
    {
        url: '/news/03/',
        date: '2025.06.10',
        title: '新オフィス（東京・神田）オープン',
    },
    {
        url: '/news/04/',
        date: '2025.06.10',
        title: '大学連携キャリアセミナーの実施決定',
    },
    {
        url: '/news/05/',
        date: '2025.06.10',
        title: '8月の夏期集中コース申込受付開始',
    },
    {
        url: '/news/06/',
        date: '2025.06.10',
        title: '夜間模擬面接会（6月開催）参加者募集中',
    },
    {
        url: '/news/07/',
        date: '2025.06.10',
        title: '新オフィス（東京・神田）オープン',
    },
    {
        url: '/news/08/',
        date: '2025.06.10',
        title: '大学連携キャリアセミナーの実施決定',
    },
];

// aboutページのスタッフ一覧
const staffData = [
    {
        image: '/assets/images/about/staffs_01.jpg',
        subName: '代表・キャリアカウンセラー',
        nameJa: '田中 美咲',
        nameEn: 'Misaki Tanaka',
    },
    {
        image: '/assets/images/about/staffs_02.jpg',
        subName: '面接対策講師',
        nameJa: '佐藤 雄一',
        nameEn: 'Yuichi Sato',
    },
    {
        image: '/assets/images/about/staffs_03.jpg',
        subName: 'ES添削講師',
        nameJa: '山田 恵子',
        nameEn: 'Keiko Yamada',
    },
    {
        image: '/assets/images/about/staffs_04.jpg',
        subName: 'IT業界専門講師',
        nameJa: '鈴木 健太',
        nameEn: 'Kentaro Suzuki',
    },
    {
        image: '/assets/images/about/staffs_05.jpg',
        subName: '女性キャリア講師',
        nameJa: '高橋 麻里',
        nameEn: 'Mari Takahashi',
    },
];

// serviceページの活用事例一覧
const serviceCaseList = [
    {
        url: '/service/case-01',
        image: '/assets/images/service/case_1.jpg',
        fromText: '経済学部',
        toText: '金融業界',
        title: '自己分析で『人をサポートする力』が自分の核だと発見できました。',
    },
    {
        url: '/service/case-02',
        image: '/assets/images/service/case_2.jpg',
        fromText: '文学部',
        toText: 'IT業会',
        title: '文系でも論理思考力でIT業界に挑戦できると気づけました。',
    },
    {
        url: '/service/case-03',
        image: '/assets/images/service/case_3.jpg',
        fromText: '工学部',
        toText: '自動車メーカー',
        title: '面接対策で技術内容を分かりやすく伝えるコツを習得しました。',
    },
    {
        url: '/service/case-04',
        image: '/assets/images/service/case_4.jpg',
        fromText: '商学部',
        toText: '金融業界',
        title: '弱みを克服し強みを活かすことでIT業界転職成功できました',
    },
    {
        url: '/service/case-05',
        image: '/assets/images/service/case_5.jpg',
        fromText: '心理学部',
        toText: '人材業界',
        title: '相手に寄り添う力を武器に人材転職を実現しました。',
    },
];

// recruitページの募集職種一覧
const recruitPositionList = [
    {
        title: '給料',
        description: '月給25万円〜35万円（経験・能力による）',
    },
    {
        title: '賞与',
        description: '年2回（6月・12月）',
    },
    {
        title: '昇給',
        description: '年1回（4月）',
    },
    {
        title: '休日・休暇',
        description: '完全週休2日制、年間休日120日',
    },
    {
        title: '有給休暇',
        description: '年10日〜20日（勤続年数による）',
    },
    {
        title: '社会保険',
        description: '健康保険、厚生年金、雇用・労災保険',
    },
    {
        title: '研修制度',
        description: '入社時研修、外部セミナー参加支援',
    },
];

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname);
    const base = env.VITE_BASE || '/';
    const siteUrl = env.VITE_SITE_URL || 'https://example.com';
    const siteName = env.VITE_SITE_NAME || 'Static Site';

    return {
        base,
        root: 'src',

        // ビルド設定(ページ追加で追記すること)
        build: {
            outDir: resolve(__dirname, 'dist'),
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'src/index.html'),
                    about: resolve(__dirname, 'src/about.html'),
                    contact: resolve(__dirname, 'src/contact.html'),
                    news: resolve(__dirname, 'src/news.html'),
                    service: resolve(__dirname, 'src/service.html'),
                    recruit: resolve(__dirname, 'src/recruit.html'),
                    '404': resolve(__dirname, 'src/404.html'),
                },
            },
        },

        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@js': resolve(__dirname, 'src/js'),
                '@styles': resolve(__dirname, 'src/styles'),
                '@images': resolve(__dirname, 'src/assets/images'),
            },
        },

        plugins: [
            handlebars({
                partialDirectory: resolve(__dirname, 'src/parts'),
                context(pagePath) {
                    const name = '/' + pagePath.split('/').pop();
                    return {
                        base,
                        siteName,
                        newsList:
                            name === '/index.html'
                                ? newsData.slice(0, 4) //indexページのお知らせ一覧は4件まで
                                : newsData, // 他ページのお知らせ一覧は全件表示
                        staffList: staffData, // スタッフ一覧
                        serviceCaseList: serviceCaseList, // 活用事例一覧
                        recruitPositionList: recruitPositionList, // 募集職種一覧
                        ...(pageData[name] || pageData['/index.html']),
                    };
                },
            }),

            svgo(),

            ViteImageOptimizer({
                png: { quality: 80 },
                jpeg: { quality: 75 },
                jpg: { quality: 75 },
                webp: { quality: 80 },
                avif: { quality: 70 },
            }),

            avifConvert({ quality: 70 }),

            faviconGenerate({
                source: 'src/assets/favicon.svg',
                name: siteName,
                shortName: 'Site',
                themeColor: '#2c3e50',
                backgroundColor: '#ffffff',
            }),

            Sitemap({
                hostname: siteUrl,
                outDir: resolve(__dirname, 'dist'),
            }),
        ],

        css: {
            devSourcemap: true,
        },
    };
});
