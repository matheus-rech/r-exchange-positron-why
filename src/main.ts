import { SECTIONS, FOOTER, SLIDES } from './slides';
import type {
	Slide, IconName, ListItem, Placeholder,
	TitleSlide, WhoSlide, PhraseSlide, ThesisSlide,
	ListSlide, BuildSlide, PremiseSlide, ShowSlide,
	SplitSlide, ComparisonSlide, ThanksSlide,
} from './types';

const LOGO_SRC = 'Posit_Logos/Posit-Logos-2024_horiz-white-quarto-web.svg';

const ICON_MAP: Record<IconName, string> = {
	code: 'icon-code',
	insight: 'icon-insight',
	data1: 'icon-data1',
	data2: 'icon-data2',
	update: 'icon-update',
	browser: 'icon-browser',
	dashboards: 'icon-dashboards',
};

function renderIcon(icon?: IconName): string {
	if (!icon) return '';
	return `<div class="slide-icon-anchor ${ICON_MAP[icon]} reveal" aria-hidden="true"></div>`;
}

function renderItems(items: ListItem[]): string {
	return items.map(item => {
		const gifSection = item.gif
			? `<button class="item-gif-toggle" aria-expanded="false" aria-label="Show demo">Show demo</button>
			   <div class="item-gif-panel" hidden>
				 <img src="${item.gif}" alt="${item.title} demo" loading="lazy" />
			   </div>`
			: '';
		return `<div class="item reveal${item.gif ? ' has-gif' : ''}">
			<div class="item-titlebar">
				<span class="item-titlebar-dot"></span>
				<span class="item-title">${item.title}</span>
			</div>
			<div class="item-content">
				<div class="item-body">${item.body}</div>
				${gifSection}
			</div>
		</div>`;
	}).join('\n');
}

function renderPlaceholders(placeholders: Placeholder[]): string {
	return placeholders.map(p =>
		`<div class="placeholder reveal">
			<div class="placeholder-titlebar">
				<span class="placeholder-titlebar-dot"></span>
				<span class="placeholder-titlebar-label">${p.tag}</span>
			</div>
			<div class="placeholder-content">
				<div class="desc">${p.desc}</div>
				<div class="hint">${p.hint}</div>
			</div>
		</div>`
	).join('\n');
}

const RENDERERS: { [K in Slide['variant']]: (s: Extract<Slide, { variant: K }>) => string } = {
	title(s: TitleSlide) {
		const logo = s.logo
			? `<img class="title-logo reveal" src="${LOGO_SRC}" alt="Posit" />`
			: '';
		const strokeLayers = Array.from({ length: 13 }, (_, i) =>
			`<span class="stroke-layer" data-layer="${i}" aria-hidden="true">${s.heading}</span>`
		).join('');
		const inner = `
			<div class="card-eyebrow">${s.eyebrow}</div>
			<h1><span class="multi-stroke">${strokeLayers}<span class="stroke-layer stroke-front">${s.heading}</span></span></h1>
			<div class="subtitle">${s.subtitle}</div>`;
		if (s.logo) {
			return `<div class="title-stack">${logo}<div class="card reveal-card">${inner}</div></div>`;
		}
		return `<div class="card reveal-card">${inner}</div>`;
	},

	who(s: WhoSlide) {
		const items = s.items.map(text => `<li class="reveal">${text}</li>`).join('\n');
		const social = s.social
			? `<div class="who-social reveal">${s.social}</div>`
			: '';
		return `<div class="who-block">
			<h2 class="who-name reveal">${s.eyebrow}</h2>
			<ul class="who-list">${items}</ul>
			${social}
		</div>`;
	},

	phrase(s: PhraseSlide) {
		const ctx = s.context
			? `<div class="phrase-context reveal">${s.context}</div>`
			: '';
		return `<div class="phrase reveal">${s.phrase}</div>${ctx}`;
	},

	thesis(s: ThesisSlide) {
		const lines = s.lines.map(line => {
			const cls = line.final ? 'thesis-line final reveal' : 'thesis-line reveal';
			const detail = line.detail
				? `<span class="thesis-detail">${line.detail}</span>`
				: '';
			return `<div class="${cls}">${line.text}${detail}</div>`;
		}).join('\n');
		return `<div class="thesis-stack">${lines}</div>`;
	},

	list(s: ListSlide) {
		return `${renderIcon(s.icon)}
			<h2 class="reveal">${s.heading}</h2>
			<div class="item-grid">${renderItems(s.items)}</div>
			${s.closing ? `<div class="closing-line reveal">${s.closing}</div>` : ''}`;
	},

	build(s: BuildSlide) {
		const lines = s.lines.map(line => {
			const toClass = line.accent === 'blue' ? 'to to-blue' : 'to';
			return `<div class="build-line reveal">
				<span class="from">${line.from}</span>
				<span class="chevron" aria-hidden="true"></span>
				<span class="${toClass}">${line.to}</span>
			</div>`;
		}).join('\n');
		const muted = s.muted
			? `<div class="build-line reveal muted"><span class="from">${s.muted}</span></div>`
			: '';
		const heading = s.heading ? `<h2 class="reveal">${s.heading}</h2>` : '';
		return `${heading}
			<div class="build-stack">${lines}${muted}</div>
			<div class="build-conclusion reveal">${s.conclusion}</div>`;
	},

	premise(s: PremiseSlide) {
		return `${renderIcon(s.icon)}
			<div class="premise-question reveal">${s.question}</div>
			<div class="premise-panel reveal">
				<div class="premise-panel-bar">
					<span class="premise-panel-dot"></span>
					<span class="premise-panel-label">Context</span>
				</div>
				<div class="premise-panel-body">${s.sub}</div>
			</div>`;
	},

	show(s: ShowSlide) {
		const caption = s.caption
			? `<div class="show-caption reveal">${s.caption}</div>`
			: '';
		let area: string;
		if (s.video) {
			area = `<video class="show-video reveal" src="${s.video}" autoplay loop muted playsinline controls></video>`;
		} else if (s.image) {
			area = `<img class="show-image reveal" src="${s.image}" alt="" />`;
		} else {
			area = renderPlaceholders(s.placeholders ?? []);
		}
		return `<h2 class="reveal">${s.heading}</h2>
			<div class="show-area">${area}</div>
			${caption}`;
	},

	split(s: SplitSlide) {
		const cols = s.columns.map(col => {
			const cls = col.blue ? 'col col-blue reveal' : 'col reveal';
			const quote = col.quote
				? `<div class="col-quote">${col.quote}</div>`
				: '';
			const image = col.image
				? `<img class="col-image" src="${col.image}" alt="" />`
				: '';
			return `<div class="${cls}">
				<div class="col-titlebar">
					<span class="col-titlebar-dot"></span>
					<span class="col-tag">${col.tag}</span>
				</div>
				${image}
				<div class="col-content">
					<div class="col-title">${col.title}</div>
					<div class="col-body">${col.body}</div>
					${quote}
				</div>
			</div>`;
		}).join('\n');
		const caption = s.caption
			? `<div class="split-caption reveal">${s.caption}</div>`
			: '';
		return `<h2 class="reveal">${s.heading}</h2>
			<div class="columns">${cols}</div>
			${caption}`;
	},

	comparison(s: ComparisonSlide) {
		const tabs = s.tabs.map((tab, i) =>
			`<button class="comparison-tab${i === 0 ? ' active' : ''}" data-tab="${i}">${tab.label}</button>`
		).join('');
		const panels = s.tabs.map((tab, i) => {
			const content = tab.image
				? `<img class="comparison-img" src="${tab.image}" alt="${tab.label}" />`
				: tab.placeholder ? renderPlaceholders([tab.placeholder]) : '';
			return `<div class="comparison-panel${i === 0 ? ' active' : ''}" data-panel="${i}">${content}</div>`;
		}).join('');
		const caption = s.caption
			? `<div class="show-caption reveal">${s.caption}</div>`
			: '';
		return `<h2 class="reveal">${s.heading}</h2>
			<div class="comparison-wrapper reveal">
				<div class="comparison-tabs">${tabs}</div>
				<div class="comparison-panels">${panels}</div>
			</div>
			${caption}`;
	},

	thanks(s: ThanksSlide) {
		const links = s.links.map(l =>
			`<div><span class="label">${l.label}</span>${l.value}</div>`
		).join('\n');
		return `<div class="thanks-block">
			<img class="title-logo reveal" src="${LOGO_SRC}" alt="Posit" />
			<div class="thanks-word reveal">${s.word}</div>
			<div class="qa-line reveal">${s.qaLine}</div>
			<div class="links reveal">${links}</div>
		</div>`;
	},
};

function buildSlides(): void {
	const container = document.getElementById('slideContainer')!;
	container.innerHTML = SLIDES.map((s, i) => {
		const num = String(i + 1).padStart(2, '0');
		const renderer = RENDERERS[s.variant] as (s: Slide) => string;

		const variantClass = `slide-${s.variant}`;
		const extraClasses: string[] = [];
		if ('cols' in s && s.cols) extraClasses.push(`cols-${s.cols}`);
		if ('twoUp' in s && s.twoUp) extraClasses.push('two-up');

		const classes = ['slide', variantClass, ...extraClasses].join(' ');
		const notes = s.notes || '';

		return `<section class="${classes}" data-section="${s.section}" data-num="${num}" data-notes="${notes.replace(/"/g, '&quot;')}">
			<div class="slide-chrome"></div>
			<div class="slide-content">${renderer(s)}</div>
			<div class="slide-footer"></div>
		</section>`;
	}).join('\n');
}

const SLIDE_INDEX_KEY = 'positron-keynote-slide';

class SlidePresentation {
	slides: HTMLElement[];
	progressBar: HTMLElement;
	currentSlide: number;
	onSlideChange: (() => void) | null;

	constructor() {
		this.slides = Array.from(document.querySelectorAll('.slide'));
		this.progressBar = document.getElementById('progressBar')!;
		this.currentSlide = 0;
		this.onSlideChange = null;

		this.populateChrome();
		this.setupIntersectionObserver();
		this.setupKeyboardNav();
		this.setupTouchNav();
		this.updateProgress();
		this.restoreSlide();
		window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
	}

	restoreSlide(): void {
		const saved = sessionStorage.getItem(SLIDE_INDEX_KEY);
		if (saved !== null) {
			const idx = parseInt(saved, 10);
			if (idx > 0 && idx < this.slides.length) {
				this.slides[idx].scrollIntoView();
				this.currentSlide = idx;
			}
		}
	}

	persistSlide(): void {
		sessionStorage.setItem(SLIDE_INDEX_KEY, String(this.currentSlide));
	}

	populateChrome(): void {
		this.slides.forEach((slide) => {
			const sectionId = parseInt(slide.dataset.section!, 10);
			const num = slide.dataset.num!;

			const chrome = slide.querySelector('.slide-chrome');
			if (chrome) {
				const sectionNum = document.createElement('div');
				sectionNum.className = 'section-num reveal';
				sectionNum.textContent = num;

				const breadcrumbs = document.createElement('div');
				breadcrumbs.className = 'breadcrumbs reveal';
				const parts: string[] = [];
				SECTIONS.forEach((s, i) => {
					if (i > 0) parts.push('<span class="sep">/</span>');
					const cls = s.id === sectionId ? 'active' : '';
					parts.push(`<span class="${cls}">${s.label}</span>`);
				});
				breadcrumbs.innerHTML = parts.join('');

				chrome.appendChild(sectionNum);
				chrome.appendChild(breadcrumbs);
			}

			const footer = slide.querySelector('.slide-footer');
			if (footer) {
				const logo = FOOTER.leftLogo
					? `<img class="footer-logo" src="${FOOTER.leftLogo}" alt="Posit" />`
					: '';
				footer.innerHTML = `
					<div class="footer-left reveal">${FOOTER.leftName}${logo}</div>
					<div class="footer-right reveal">${FOOTER.right}</div>
				`;
			}
		});
	}

	setupIntersectionObserver(): void {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
						entry.target.classList.add('visible');
						this.currentSlide = this.slides.indexOf(entry.target as HTMLElement);
						this.persistSlide();
						if (this.onSlideChange) this.onSlideChange();
					}
				});
			},
			{ threshold: [0.3, 0.5, 0.7] }
		);
		this.slides.forEach((slide) => observer.observe(slide));
	}

	setupKeyboardNav(): void {
		document.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'ArrowDown':
				case 'ArrowRight':
				case 'PageDown':
				case ' ':
					e.preventDefault();
					this.goTo(this.currentSlide + 1);
					break;
				case 'ArrowUp':
				case 'ArrowLeft':
				case 'PageUp':
					e.preventDefault();
					this.goTo(this.currentSlide - 1);
					break;
				case 'Home':
					e.preventDefault();
					this.goTo(0);
					break;
				case 'End':
					e.preventDefault();
					this.goTo(this.slides.length - 1);
					break;
			}
		});
	}

	setupTouchNav(): void {
		let touchStartY = 0;
		document.addEventListener('touchstart', (e) => {
			touchStartY = e.touches[0].clientY;
		}, { passive: true });
		document.addEventListener('touchend', (e) => {
			const dy = e.changedTouches[0].clientY - touchStartY;
			if (Math.abs(dy) < 50) return;
			this.goTo(this.currentSlide + (dy < 0 ? 1 : -1));
		}, { passive: true });
	}

	goTo(index: number): void {
		const target = Math.max(0, Math.min(this.slides.length - 1, index));
		this.slides[target].scrollIntoView({ behavior: 'smooth' });
	}

	updateProgress(): void {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
		this.progressBar.style.width = pct + '%';
	}
}


function formatNotes(raw: string): string {
	if (!raw) return '';
	const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
	const html: string[] = [];
	let inList = false;

	for (const line of lines) {
		const isBullet = line.startsWith('- ');
		const isStandaloneCue = /^\[.+\]$/.test(line);

		if (!isBullet && inList) {
			html.push('</ul>');
			inList = false;
		}
		if (isBullet && !inList) {
			html.push('<ul>');
			inList = true;
		}

		if (isStandaloneCue) {
			html.push(`<div class="cue">${line}</div>`);
		} else if (isBullet) {
			let content = line.slice(2);
			content = content.replace(/\[([^\]]+)\]/g, '<span class="cue">[$1]</span>');
			html.push(`<li>${content}</li>`);
		} else {
			let content = line;
			content = content.replace(/\[([^\]]+)\]/g, '<span class="cue">[$1]</span>');
			html.push(`<p>${content}</p>`);
		}
	}

	if (inList) html.push('</ul>');
	return html.join('');
}

class SpeakerNotes {
	presentation: SlidePresentation;
	popup: Window | null;

	constructor(presentation: SlidePresentation) {
		this.presentation = presentation;
		this.popup = null;

		this.reattachPopup();

		document.addEventListener('keydown', (e) => {
			if (e.key === 'n' || e.key === 'N') {
				this.toggle();
			}
		});
	}

	reattachPopup(): void {
		if (!window.name && sessionStorage.getItem('speaker-notes-open')) {
			const existing = window.open('', 'speaker-notes');
			if (existing && existing.location.href !== 'about:blank' && !existing.closed && existing.document.getElementById('notes')) {
				this.popup = existing;
				this.update();
			} else if (existing && existing.location.href === 'about:blank') {
				existing.close();
			}
			sessionStorage.removeItem('speaker-notes-open');
		}
	}

	toggle(): void {
		if (this.popup && !this.popup.closed) {
			this.popup.close();
			this.popup = null;
			sessionStorage.removeItem('speaker-notes-open');
			return;
		}
		this.popup = window.open('', 'speaker-notes', 'width=500,height=350');
		if (!this.popup) return;
		sessionStorage.setItem('speaker-notes-open', '1');
		this.popup.document.write(`<!DOCTYPE html>
<html><head><title>Speaker Notes</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
<style>
	body { background: #1a1a1a; color: #F2F2F2; font-family: 'Open Sans', Arial, sans-serif;
		padding: 1.5rem; margin: 0; }
	.label { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
		color: #EE6331; margin-bottom: 0.75rem; font-weight: 700; }
	.slide-num { font-size: 0.75rem; color: rgba(242,242,242,0.45); margin-bottom: 1rem; }
	.notes { font-size: 1.05rem; line-height: 1.7; }
	.notes:empty::after { content: '(no notes for this slide)'; color: rgba(242,242,242,0.3); }
	.notes p { margin: 0 0 0.75rem; }
	.notes ul { margin: 0.25rem 0 0.75rem 1.25rem; padding: 0; }
	.notes li { margin-bottom: 0.4rem; }
	.notes .cue { color: #EE6331; font-size: 0.85em; font-style: italic; }
</style></head><body>
<div class="label">Speaker Notes</div>
<div class="slide-num" id="slideNum"></div>
<div class="notes" id="notes"></div>
</body></html>`);
		this.popup.document.close();
		this.update();
	}

	update(): void {
		if (!this.popup || this.popup.closed) return;
		const idx = this.presentation.currentSlide;
		const slide = this.presentation.slides[idx];
		const raw = SLIDES[idx]?.notes || '';
		const num = slide ? slide.dataset.num : '';
		const titleEl = slide ? slide.querySelector('h1, h2, .phrase, .thanks-word') : null;
		const title = titleEl ? titleEl.textContent : '';
		this.popup.document.getElementById('slideNum')!.textContent = 'Slide ' + num + (title ? ' -- ' + title.trim() : '');
		this.popup.document.getElementById('notes')!.innerHTML = formatNotes(raw);
	}
}

function setupFullscreen(): void {
	document.addEventListener('keydown', (e) => {
		if (e.key === 'f' || e.key === 'F') {
			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else {
				document.documentElement.requestFullscreen();
			}
		}
	});
}

function setupGifAccordion(): void {
	document.addEventListener('click', (e) => {
		const toggle = (e.target as HTMLElement).closest('.item-gif-toggle');
		if (!toggle) return;

		const item = toggle.closest('.item')!;
		const panel = item.querySelector('.item-gif-panel') as HTMLElement;
		const isOpen = toggle.getAttribute('aria-expanded') === 'true';

		if (!isOpen) {
			document.querySelectorAll('.item-gif-toggle[aria-expanded="true"]').forEach(other => {
				other.setAttribute('aria-expanded', 'false');
				other.textContent = 'Show demo';
				const otherPanel = other.closest('.item')!.querySelector('.item-gif-panel') as HTMLElement;
				otherPanel.hidden = true;
			});
		}

		toggle.setAttribute('aria-expanded', String(!isOpen));
		toggle.textContent = isOpen ? 'Show demo' : 'Hide demo';
		panel.hidden = isOpen;
	});
}

function setupComparisonTabs(): void {
	document.addEventListener('click', (e) => {
		const tab = (e.target as HTMLElement).closest('.comparison-tab');
		if (!tab) return;

		const slide = tab.closest('.slide-comparison')!;
		const idx = tab.getAttribute('data-tab');

		slide.querySelectorAll('.comparison-tab').forEach(t => t.classList.remove('active'));
		slide.querySelectorAll('.comparison-panel').forEach(p => p.classList.remove('active'));

		tab.classList.add('active');
		slide.querySelector(`.comparison-panel[data-panel="${idx}"]`)!.classList.add('active');
	});
}

document.addEventListener('DOMContentLoaded', () => {
	buildSlides();
	const presentation = new SlidePresentation();
	const notes = new SpeakerNotes(presentation);
	presentation.onSlideChange = () => notes.update();
	setupFullscreen();
	setupGifAccordion();
	setupComparisonTabs();
});
