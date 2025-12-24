# Caffeine Viz Dashboard (시각화 대시보드)

**Caffeine 프로젝트**의 아키텍처, 데이터 흐름, ML 파이프라인 및 기술 스택을 시각화하는 종합 대시보드입니다.

![Caffeine Viz Dashboard Check](https://via.placeholder.com/800x400?text=Caffeine+Viz+Dashboard)

## 🌟 주요 기능

이 프로젝트는 다양한 시각화 도구를 통합하여 시스템을 분석합니다:

| 도구 | 탭 이름 | 기능 설명 |
|------|---------|-----------|
| **React Flow** | 📐 Flow | 8개의 상호작용 가능한 아키텍처 다이어그램 (전체 구조, DB, API 등) |
| **D3/Recharts** | 📊 Charts | 소비 데이터 분석 차트 (원형, 막대, 영역 차트) |
| **ChartDB** | 🗄️ ChartDB | 다크 테마 데이터베이스 스키마 및 관계 시각화 |
| **tldraw** | ✏️ Whiteboard | 자유형 화이트보드 (아이디어 스케치용) |
| **Tech Radar** | 🎯 Tech Radar | 기술 스택 분류 (Adopt, Trial...) 및 프로젝트 타임라인 |
| **API Docs** | 📚 API Docs | REST API 엔드포인트 명세 라이브러리 |
| **Diagrams** | 📐 Python Diagrams | Python 코드로 생성된 클라우드 아키텍처 이미지 뷰어 |

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 로컬 개발 서버 시작 (http://localhost:5173)
npm run dev
```

### 아키텍처 다이어그램 재생성 (선택 사항)

Python `diagrams` 라이브러리를 사용하여 이미지를 다시 생성하려면:

```bash
# Python 가상환경 생성 및 패키지 설치
python3 -m venv .venv
source .venv/bin/activate
pip install diagrams graphviz

# 다이어그램 생성 실행
python scripts/generate_diagrams.py
```
> **참고**: 시스템에 `graphviz` (`sudo apt install graphviz`)가 설치되어 있어야 합니다.

## 📦 배포

### 빌드

```bash
npm run build
```
`dist/` 폴더에 정적 파일이 생성됩니다.

### GitHub Pages 배포

이 프로젝트는 GitHub Pages 배포를 지원합니다. `package.json`의 `homepage` 필드와 `vite.config.ts`의 `base` 설정을 수정하여 배포할 수 있습니다.

## 🛠️ 기술 스택

- **Frontend**: React, TypeScript, Vite
- **Visualization**: React Flow, Recharts, tldraw, Mermaid
- **Utils**: Lucide React (Icons), Dagre (Auto Layout)

---
© 2025 Caffeine Project. All rights reserved.
