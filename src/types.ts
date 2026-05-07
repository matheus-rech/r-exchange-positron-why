export interface Section {
	id: number;
	label: string;
}

export interface Footer {
	leftName: string;
	leftLogo?: string;
	right: string;
}

export type IconName = 'code' | 'insight' | 'data1' | 'data2' | 'update' | 'browser' | 'dashboards';

export interface Placeholder {
	tag: string;
	desc: string;
	hint: string;
}

export interface ListItem {
	title: string;
	body: string;
	gif?: string;
}

interface SlideBase {
	section: number;
	notes: string;
}

export interface TitleSlide extends SlideBase {
	variant: 'title';
	logo?: boolean;
	eyebrow: string;
	heading: string;
	subtitle: string;
}

export interface WhoSlide extends SlideBase {
	variant: 'who';
	eyebrow: string;
	name?: string;
	items: string[];
	social?: string;
}

export interface PhraseSlide extends SlideBase {
	variant: 'phrase';
	phrase: string;
	context?: string;
}

export interface ThesisLine {
	text: string;
	final?: boolean;
	detail?: string;
}

export interface ThesisSlide extends SlideBase {
	variant: 'thesis';
	lines: ThesisLine[];
}

export interface ListSlide extends SlideBase {
	variant: 'list';
	cols: 1 | 2 | 4;
	icon?: IconName;
	heading: string;
	items: ListItem[];
	closing?: string;
}

export interface BuildLine {
	from: string;
	to: string;
	accent?: 'blue';
}

export interface BuildSlide extends SlideBase {
	variant: 'build';
	heading?: string;
	lines: BuildLine[];
	muted?: string;
	conclusion: string;
}

export interface PremiseSlide extends SlideBase {
	variant: 'premise';
	icon?: IconName;
	question: string;
	sub: string;
}

export interface ShowSlide extends SlideBase {
	variant: 'show';
	twoUp?: boolean;
	heading: string;
	image?: string;
	video?: string;
	placeholders?: Placeholder[];
	caption?: string;
}

export interface SplitColumn {
	tag: string;
	title: string;
	body: string;
	blue?: boolean;
	quote?: string;
	image?: string;
}

export interface SplitSlide extends SlideBase {
	variant: 'split';
	heading: string;
	columns: SplitColumn[];
	caption?: string;
}

export interface ComparisonTab {
	label: string;
	image?: string;
	placeholder?: Placeholder;
}

export interface ComparisonSlide extends SlideBase {
	variant: 'comparison';
	heading: string;
	tabs: ComparisonTab[];
	caption?: string;
}

export interface ThanksLink {
	label: string;
	value: string;
}

export interface ThanksSlide extends SlideBase {
	variant: 'thanks';
	word: string;
	qaLine: string;
	links: ThanksLink[];
}

export type Slide =
	| TitleSlide
	| WhoSlide
	| PhraseSlide
	| ThesisSlide
	| ListSlide
	| BuildSlide
	| PremiseSlide
	| ShowSlide
	| SplitSlide
	| ComparisonSlide
	| ThanksSlide;
