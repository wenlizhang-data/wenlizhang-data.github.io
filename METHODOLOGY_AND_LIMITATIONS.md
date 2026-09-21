# Methodology and limitations

Status: analysis locked; local publication candidate. No public upload has been made.

## Purpose and ownership

This project examines sampled comments under seven news sources' YouTube videos. It demonstrates data quality, reproducible processing, transparent text analysis and cautious interpretation. It is not a customer conversion, revenue, retention, causal-inference or production NLP project.

Originally completed as a CityU COM5507 group research project; all data-related work presented in this portfolio was completed by me.

The original final academic report was a group deliverable. The 2026 portfolio refactoring was developed with Codex assistance and is documented separately from the original work. This distinction must be retained in interview discussions; understanding and explaining the code is not the same as claiming every 2026 line was written unaided.

## Source selection and provenance

The baseline is seven per-media original CSV captures, concatenated with a media field. They contain 40,187 records and 140 video URLs. They are preferable to an Excel-formatted file misleadingly named CSV because the workbook contains 35 comment cells converted into non-string types. Matching normalised metadata and string representations yields 40,161 shared rows and 26 unmatched rows; this comparison does not undo spreadsheet coercion or prove the CSVs contain every comment ever posted.

The 38,366-row cleaned and 39,569-row report versions are retained privately for comparison, not used as analytical inputs. The old report's per-media denominators match the latter version. Exact multiset overlaps are in `data/aggregated/legacy_version_comparison.csv`. Unmatched rows can arise from text transformations, type conversion, exclusion or different export histories. A complete raw-to-legacy lineage cannot be reconstructed, and no deterministic explanation is invented for every difference.

Original files remain untouched. Private snapshots and a local source-path manifest sit outside this repository. `data/source_manifest.json` exposes filenames, file sizes and SHA-256 checksums, not comment text or local personal paths.

## Record grain and cleaning

A captured row is not a unique person. Without comment IDs, timestamps or author identifiers, repeated text within one video cannot be reliably separated into repeated scraping versus genuinely repeated comments.

The canonical grain is one **distinct video–normalised-text pair**. Normalisation applies Unicode NFC, trims surrounding whitespace and collapses whitespace runs. It preserves case, punctuation, negation, numbers within text and emojis within text. It does not rewrite spelling, translate text or strip politically meaningful terms.

Cleaning order:

1. Exclude empty text and the literal `nan` sentinel, case-insensitively. Missing is not neutral.
2. Exclude records without any alphabetic character from text analysis. These are not asserted to be worthless audience responses; symbol-only reactions remain in the private original archive.
3. Validate video IDs and parse video publication dates. Invalid metadata is an explicit exclusion rather than an inferred date.
4. Collapse repeated exact video–normalised-text pairs. Identical text across different videos remains. Each retained pair stores `capture_occurrences`, and a repeat-weighted sensitivity calculation shows what happens if the repeated captures are counted.
5. Keep all valid dates in the private canonical archive. Apply the separate publication-window and language filters only for the portfolio analytical sample.

No record is removed because its sentiment or political wording is inconvenient. There is no global comment-text deduplication. The full row audit and exclusion reasons remain private.

## Scope

The approved research window is **2023-10-07 through 2023-12-02, inclusive**, by video publication date. These dates are not comment posting dates. The scoped dataset contains **33,851 records / 124 videos / 7 sources**; the English analytical sample contains **27,482 records / 123 videos / 7 sources**. The latter is used only for TextBlob and current English phrase indicators, not called the final clean dataset. The scoped population supports composition and concentration analysis without an English gate. The end date is the latest retained video publication date, not proof of collection completeness.

All original 140 videos remain in the source archive. The publication filter retains 124 videos before language screening. NYT retains only 7 of its original 20 videos; BBC retains 19, CGTN 18, and AL/CNN/DW/NBC 20 each. Cross-source comparisons are descriptions of selected video sets, not like-for-like media performance rankings.

There are no comment posting timestamps, collection timestamps, comment IDs, author IDs, impressions, engagement denominators, customer records or reliable geography. Do not claim representative audiences, complete comment coverage, national public opinion or responses caused by an event. Search ranking and comment loading/sorting may have influenced the original capture.

## Language screening — added in 2026

The original recovered NBC code used `langdetect`; the 2026 pipeline applies one common gate to every source. This is a new analytical scope decision, not a claim that the original project consistently did this.

- `langdetect==1.0.9`, deterministic seed 0.
- At least three word tokens.
- Highest-scoring language must be English and its detector score at least 0.90.
- Short, low-confidence/undetermined and predicted non-English records remain in the screening audit but are not scored with the English sentiment lexicon.

The detector score is not a calibrated probability of correctness. Code-switching and short ambiguous texts can be misclassified. The gate changes the population and excludes some legitimate English reactions. Source-specific retention is shown explicitly. Language does not establish nationality. FastText was not recovered or recreated.

## Sentiment

TextBlob 0.17.1 supplies the original lexicon-based polarity approach. Score the preserved text, not a stopword-stripped representation. Classify polarity above 0.1 as Positive, below -0.1 as Negative, and otherwise Neutral; boundaries are inclusive for Neutral. A 2026 numerical-stability correction rounds the comparison value to 12 decimal places before thresholding, while retaining the original score. This prevents floating-point values such as -0.10000000000000002 from crossing an intended -0.1 boundary.

Denominator: all English-screened distinct video–text records in the relevant media group. All records in that denominator receive exactly one category. Subjectivity is retained privately as a model output but is not interpreted as truthfulness or objectivity.

Sentiment polarity is a text-scoring proxy. It does not measure political position, media approval, factual accuracy or intent. Sarcasm, quotations, condolences, blessings and emotionally loaded subject matter are known interpretation challenges. No accuracy estimate is claimed.

## Selected Phrase Indicators — repaired legacy component

`data/theme_rules.json` preserves the original project's four hand-built phrase lists. Display labels are cautiously renamed, especially the original 'historical' category, which includes age references. These are narrow phrase indicators, not exhaustive topic discovery.

The corrected implementation uses exact lowercase 2- and 3-token tuple matching. N-grams never cross comment boundaries or the punctuation-defined clause boundaries used by the tokenizer. Stopwords are **not** deleted before phrase matching, so the system does not silently invent adjacency. Punctuation splitting is a simple rule, not full linguistic parsing. Earlier whitespace normalisation collapses newlines. Commas, hyphens and digits can be discarded during token extraction rather than creating a boundary; contiguous here means contiguous extracted tokens. No semantic taxonomy validation is claimed.

Each record contributes at most once to each matching theme. A record can match several themes; percentages must not be added to 100%. Denominator: all eligible records in a source, including unmatched records. Phrase-indicator coverage is reported to prevent the dictionary from appearing to summarise all discussion.

Matching a slogan or phrase does not establish whether its author endorses, rejects, quotes or mocks it. The inherited dictionary is selective, can contain contested terminology, and cannot justify a claim that a theme is the audience's main concern. No LSA, LLM or new supervised model is added.

## Comparisons and sensitivity

Primary distributions are weighted by eligible text records. `weighting_sensitivity.csv` also provides:

- equal weighting of the represented videos, after computing each video's distribution;
- capture-occurrence weighting, retaining repeated video–text captures.

These are sensitivity checks, not competing estimates of a known population parameter. No significance tests or confidence intervals are used: the sampling process and dependence among comments are not known well enough to support population-level claims.

Phrase-by-sentiment results are retained only in the appendix as a measurement caution. Both measures depend on the same words, creating lexical coupling. A blessing phrase may both trigger a theme and influence a positive score; this is not independent evidence of more positive people or stronger actual emotions.

## Validation and publication

Generated aggregates reconcile counts, denominators and source coverage. Regression checks cover missing/neutral boundaries, exact 3-token matching, no cross-comment phrases, independent datasets and retained cross-video text. Separate calculations recompute aggregate numerators and denominators from private analytical records.

A small targeted challenge sample remains private, with qualitative reviewer notes and an explicit reviewer identity. It is not a random labelled test set, inter-rater reliability exercise or established ground truth. Any Codex-assisted review is labelled as such and is not attributed to a human analyst.

The public candidate contains code, aggregate tables, figures and explanatory documents. No raw text, row-level scored text, student IDs, group-member information, account screenshots or course materials belong here. The publication checklist documents checked privacy boundaries and remaining licensing decisions; no upload is performed in this phase.

## Sample structure — added in this checkpoint

Use canonical records restricted to the approved video window, irrespective of English eligibility. `sample_media.csv` groups per-video record counts by source. It reports source totals/shares, videos, median, Q1/Q3, range and largest-video share. `video_concentration.csv` sorts counts descending and computes cumulative count / total scoped records. Public ranked outputs omit video IDs, links and titles. Quantiles use pandas linear interpolation over one count per video; fractional quartiles are valid interpolated statistics.

`weighting_comparison.csv` independently recomputes record-weighted, equal-video and capture-occurrence-weighted shares. Overall equal-video weighting averages across eligible videos, not equally across media. Videos with no English eligible records cannot contribute a sentiment proportion. Small-video denominators make source comparisons less stable. No sophisticated concentration index or new analytical model is introduced.

Presentation labels use Selected Phrase Indicators. Historical `theme_*` aggregate filenames and internal dictionary keys are preserved for traceability; they do not imply topic modelling.

## Reproduction

Use Python 3.12 and install `requirements-lock.txt` for the complete tested environment, or `requirements.txt` for direct pinned dependencies. The full pipeline needs the exact private source snapshots listed in `data/source_manifest.json`. Place them in `../private/source/`, outside the repository. Seven per-media captures are analytical inputs; three historical exports support provenance reconciliation. No substitute data are generated.

```bash
python scripts/pipeline.py all --private-dir ../private
python scripts/figures.py
python scripts/validate.py
```

Alternatively, select the installed environment's kernel and run `notebooks/01_data_quality_and_scope.ipynb`, then `notebooks/02_audience_analysis.ipynb`. Notebook 01 rebuilds quality/scope outputs; notebook 02 completes English analysis, sample structure, figures and validation. Only aggregate outputs are displayed. A private language-prediction cache accelerates reruns and can be rebuilt from the source text.

Without private inputs, run `python scripts/figures.py` to regenerate figures from published aggregates. It does not require credentials or a network analysis API. Chart typography prefers an installed Inter, Helvetica Neue or Arial, with DejaVu Sans fallback; fonts are not downloaded or bundled. Platform fonts can change text rendering, not analytical values.
