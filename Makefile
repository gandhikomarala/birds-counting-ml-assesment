all: install test build

install:
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

test:
	pytest backend/tests
	cd frontend && npm test

build:
	cd frontend && npm run build
