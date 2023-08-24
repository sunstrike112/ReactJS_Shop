export const fileSystem = [
  {
    value: '/app',
    label: 'app',
    children: [
      {
        value: '/app/Http',
        label: 'Http',
        children: [
          {
            value: '/app/Http/Controllers',
            label: 'Controllers',
            children: [
              {
                value: '/app/Http/Controllers/WelcomeController.js',
                label: 'WelcomeController.js',
              },
            ],
          },
          {
            value: '/app/Http/routes.js',
            label: 'routes.js',
          },
        ],
      },
      {
        value: '/app/Providers',
        label: 'Providers',
        children: [
          {
            value: '/app/Providers/EventServiceProvider.js',
            label: 'EventServiceProvider.js',
          },
        ],
      },
    ],
  },
  {
    value: '/config',
    label: 'config',
    children: [
      {
        value: '/config/app.js',
        label: 'app.js',
      },
      {
        value: '/config/database.js',
        label: 'database.js',
      },
    ],
  },
  {
    value: '/public',
    label: 'public',
    children: [
      {
        value: '/public/assets/',
        label: 'assets',
        children: [
          {
            value: '/public/assets/style.css',
            label: 'style.css',
          },
        ],
      },
      {
        value: '/public/index.html',
        label: 'index.html',
      },
    ],
  },
  {
    value: '/.env',
    label: '.env',
  },
  {
    value: '/.gitignore',
    label: '.gitignore',
  },
  {
    value: '/README.md',
    label: 'README.md',
  },
];
export const dumpData = [
  {
    tableName: 't_work_interview_log',
    columns: [
      {
        columnName: 'interview_category',
        data: ['通常​', 'アサイン前​​', 'FB （給与改定）​​', '注意・指導​​', '謝罪​​'],
      },
      {
        columnName: 'interview_responsible_person',
        data: ['0000000', '1223', '1111'],
      },
    ],
  },
  {
    tableName: 't_work_overview',
    columns: [
      {
        columnName: 'status',
        data: ['青', '黄', '赤', '緑', 'string'],
      },
      {
        columnName: 'es_manager',
        data: ['0000000', '1223', '1111', '1234', 'dsa-d', '2222'],
      },
      {
        columnName: 'relationship',
        data: ['1', '3', '4', '2', '0'],
      },
      {
        columnName: 'comprehension',
        data: ['1', '3', '4', '2', '0'],
      },
      {
        columnName: 'predecessor',
        data: [
          '0000000',
          '1223',
          '1111',
          '1234',
          'dsa-d',
          '2222',
          'a001                       des',
          '1234',
          'Abc',
          'aafear',
          'aatrox',
          'CCChdhsajdashdkjashkdjhaskjh',
          '担当者10002',
          '111',
          '担当者０００１',
          '123',
          'moitao',
          '担当者10023',
          'doi ten',
          '担当者1002',
          '担当者100202',
        ],
      },
      {
        columnName: 'action_required',
        data: ['true', 'false'],
      },
      {
        columnName: 'when_end',
        data: [
          '2022-07-05',
          '2022-07-14',
          '2022-07-15',
          '2022-07-16',
          '2022-07-17',
          '2022-07-18',
          '2022-07-19',
          '2022-07-10',
          '2022-07-11',
          '2022-07-12',
          '2022-07-13',
          '2023-05-25',
          '2023-06-04',
          '2023-06-22',
          '2023-06-23',
          '2023-05-26',
          '2023-06-21',
          '2023-06-29',
        ],
      },
      {
        columnName: 'pinasa_flag',
        data: ['true', 'false'],
      },
      {
        columnName: 'overtime_flag',
        data: ['true', 'false'],
      },
      {
        columnName: 'leave_off',
        data: ['true', 'false'],
      },
      {
        columnName: 'childcare_maternity_leave',
        data: ['true', 'false'],
      },
      {
        columnName: 'not_in_operation',
        data: ['true', 'false'],
      },
    ],
  },
  {
    tableName: 't_work_project_info',
    columns: [
      {
        columnName: 'project_name',
        data: [],
      },
      {
        columnName: 'client',
        data: [],
      },
      {
        columnName: 'unit_price',
        data: [],
      },
      {
        columnName: 'sales_in_charge',
        data: [],
      },
      {
        columnName: 'evaluation',
        data: [],
      },
      {
        columnName: 'sell_team',
        data: [],
      },
    ],
  },
  {
    tableName: 't_work_empl_success',
    columns: [
      {
        columnName: 'es_status',
        data: ['不明', '問題あり', '問題なし'],
      },
      {
        columnName: 'job_description',
        data: ['特定のフェーズ/テーマ', '達成感', '裁量度', 'チャレンジ', '社会的意義'],
      },
      {
        columnName: 'relationships',
        data: ['尊敬できる人', '褒めてくれる人', '仲がいい人'],
      },
      {
        columnName: 'career',
        data: ['ポジション（えらくなりたい）', '市場価値', '昇格欲'],
      },
      {
        columnName: 'money',
        data: ['稼ぎたい'],
      },
      {
        columnName: 'work_method',
        data: ['プライベート重視', '子育て', 'リモート重視'],
      },
      {
        columnName: 'others_success',
        data: ['自己重要感', '自己効力感', 'その他自由記述'],
      },
    ],
  },
  {
    tableName: 't_basic_info',
    columns: [
      {
        columnName: 'position',
        data: [
          '01_パートナー',
          '02_シニアマネージャー',
          '02_シニアアーキテクト',
          '03_マネージャー',
          '03_アーキテクト',
          '04_シニアコンサルタント',
          '05_コンサルタント',
          '06_アナリスト',
        ],
      },
      {
        columnName: 'sex',
        data: ['男性', '女性'],
      },
      {
        columnName: 'birthday',
        data: ['25'],
      },
      {
        columnName: 'joining_company',
        data: ['2023-12-06'],
      },
      {
        columnName: 'mid_career_new_graduate',
        data: ['中途', '新卒​'],
      },
      {
        columnName: 'retirement',
        data: ['在籍​​', '退職​​'],
      },
      {
        columnName: 'retirement_date',
        data: ['2023-12-06'],
      },
      {
        columnName: 'es_responsibility',
        data: ['true', 'false'],
      },
      {
        columnName: 'royalties_optional',
        data: ['3'],
      },
    ],
  },
];
