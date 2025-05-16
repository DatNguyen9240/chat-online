├── app/ # Next.js 13+ App Router
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ ├── (admin)/ # Admin routes
│ │ ├── layout.tsx
│ │ └── page.tsx
│ └── (main)/ # Main routes
│ ├── layout.tsx
│ └── page.tsx
├── public/ # Static files
│ └── assets/ # Chuyển từ src/assets
├── src/ # Giữ nguyên cấu trúc src hiện tại
│ ├── assets/ # Giữ nguyên
│ ├── components/ # Giữ nguyên
│ ├── constants/ # Giữ nguyên
│ ├── i18n/ # Giữ nguyên
│ ├── lib/ # Giữ nguyên
│ ├── routers/ # Giữ nguyên
│ ├── utils/ # Giữ nguyên
│ ├── hooks/ # Giữ nguyên
│ ├── services/ # Giữ nguyên
│ ├── stores/ # Giữ nguyên
│ ├── types/ # Giữ nguyên
│ └── styles/ # Giữ nguyên
├── .storybook/ # Giữ nguyên
├── .dockerignore # Giữ nguyên
├── .editorconfig # Giữ nguyên
├── .gitignore # Giữ nguyên
├── Dockerfile # Giữ nguyên
├── LICENSE # Giữ nguyên
├── README.md # Giữ nguyên
├── README-zh_CN.md # Giữ nguyên
├── CONTRIBUTING.md # Giữ nguyên
├── package.json # Cập nhật cho Next.js
├── tsconfig.json # Cập nhật cho Next.js
├── next.config.js # Mới - Cấu hình Next.js
├── postcss.config.js # Mới - Cấu hình PostCSS
├── tailwind.config.js # Mới - Cấu hình Tailwind
├── .env.development # Mới - Biến môi trường development
├── .env.production # Mới - Biến môi trường production
├── .env.test # Mới - Biến môi trường test
└── .env.local # Mới - Biến môi trường local
