# From retained comment captures to defensible audience analysis

## Context and contribution

This case study examines sampled YouTube comments from seven news sources. It began as a City University of Hong Kong COM5507 group research project. I completed the data collection, cleaning, Python processing, text analysis, calculations and visualisations; the academic report was a group deliverable. The 2026 rebuild was developed with Codex assistance and is distinguished from the original work.

The analytical question is how polarity distributions and selected wording differ across the retained samples, after checking provenance, defining the population and testing weighting. The intended application is disciplined audience/content research, not political interpretation or a deployed business system.

## 1. Establish a defensible baseline

Retained files included several versions of the data, a workbook labelled as CSV, inconsistent missing-value treatment and incomplete code lineage. The seven original per-media CSV captures were selected because they preserve text without the workbook's cell-type coercion. Source checksums identify the exact inputs. Historical exports remain private comparison evidence rather than targets to make the new results match.

| Population | Records | Videos | Analytical purpose |
|---|---:|---:|---|
| Captured archive | 40,187 | 140 | Preserve retained capture evidence |
| Canonical archive | 38,204 | 140 | Distinct normalised video–text pairs after basic checks |
| Scoped dataset | 33,851 | 124 | Source composition and video concentration |
| English analytical sample | 27,482 | 123 | Current TextBlob and selected English phrase indicators |


All populations contain seven media sources. The approved window is **2023-10-07 to 2023-12-02 inclusive, by video publication date—not comment posting date**. No comment timeline or before/after event effect is inferred.

Missing-text handling, alphabetic-content checks and repeated-candidate treatment establish the canonical archive. The date filter is a research-scope restriction; the English gate is a model-domain restriction. Neither is described as simply removing bad data.

The duplicate-candidate key is `(video_id, NFC + whitespace-normalised text)`. Case, punctuation and emojis are preserved; identical text across videos remains separate. Without comment IDs, authors or timestamps, identical text within a video cannot be proven to be repeated scraping. The row audit and `capture_occurrences` retain that uncertainty.

## 2. Understand the sample before comparing text scores

Within the scoped dataset, CNN and BBC account for 62.59% of records. Across 124 videos, the median is 148.5 records; Q1/Q3 are 35.75/456.25, and the range is 1–1,096. Quartiles use linear interpolation.

The top five videos contribute 15.00%; the top ten contribute 27.31%. CGTN illustrates why source totals are insufficient: its largest video accounts for 753 of 860 records (87.56%). These are retained captured records, not full engagement or audience size.

Record weighting gives high-volume videos more influence. Equal-video weighting first computes category proportions inside each eligible video and then averages them. Overall, that average is across 123 videos, not equally across seven sources.

| sentiment | record_weighted_share | video_equal_weight_share | difference_pp |
| --- | --- | --- | --- |
| Negative | 15.99% | 16.70% | +0.71 |
| Neutral | 52.87% | 52.81% | -0.07 |
| Positive | 31.13% | 30.49% | -0.64 |

Differences are equal-video minus record-weighted, in percentage points. Overall category ordering remains unchanged, but source-level differences reach 3.81 points. NBC Positive changes from 29.60% to 33.40%; NYT changes from 38.18% to 34.83%. NBC and CNN change relative order, discouraging source rankings.

Equal-video weighting is not automatically superior: 15 eligible videos have fewer than ten English analytical records. Small-sample proportions receive the same weight as large ones. The repeated-capture sensitivity remains available as a separate check on duplicate ambiguity. See [complete sample and sensitivity tables](SAMPLE_STRUCTURE.md).

## 3. Interpret polarity as a measurement, not an attitude label

TextBlob uses the retained English-oriented polarity method: scores above 0.1 are Positive, below −0.1 Negative, and the inclusive interval is Neutral. The threshold comparison is rounded to 12 decimals to prevent floating-point boundary noise; the original scores remain in private data.

The overall distribution is 52.87% Neutral, 31.13% Positive and 15.99% Negative. These observed outputs can help select text and videos for contextual review. They do not establish objectivity, approval, political stance, satisfaction or a causal media effect.

A small, targeted Codex-assisted review documented language-screening errors, ambiguous wording and polarity mismatches. It is not a representative accuracy benchmark or owner-completed human annotation. No accuracy figure is claimed.

## 4. Repair the phrase implementation and narrow the conclusion

The inherited workflow could join tokens across comments, fail trigram matching through incompatible data types, and reuse stale tokens between source analyses. The rebuilt functions process each record independently, compare token tuples and aggregate Boolean indicators. Regression checks cover these defects.

The inherited dictionary was preserved rather than expanded. It matches 1,997 / 27,482 English analytical records (7.27%). Each source/category denominator includes every eligible record, including unmatched ones; a record may match multiple categories.

The result is presented as Selected Phrase Indicators. Neither dictionary coverage nor the category taxonomy supports comprehensive topic modelling or dominant-concern claims. Literal phrase matching cannot distinguish endorsement from quotation or rejection. Tokenisation also discards some punctuation and digits, so adjacency means adjacent extracted tokens, not a syntactic interpretation.

The former phrase–sentiment comparison is now an [appendix measurement caution](APPENDIX_PHRASE_SENTIMENT.md): the same words can trigger a phrase category and affect polarity. That lexical coupling provides limited independent audience insight.

## What this demonstrates

The portfolio's contribution is a traceable sequence from messy retained captures to explicit populations, tested calculations and bounded conclusions. Source hashes, pinned dependencies, private row audits, independently reconciled aggregates and reproducible figures support inspection. The new sample-structure checks and visual system are 2026 additions; no unsupported model was retroactively attributed to the university project.

An insights team could use this workflow to check sample coverage and choose contextual follow-up questions. No intervention was deployed and no revenue, retention or engagement uplift occurred or is claimed.

## Reproducibility and boundaries

Code and aggregate outputs are public-candidate materials. Comment-level text, private validation examples and original group documents are withheld. Full numerical reproduction requires the original private input snapshots; figure regeneration works from the included aggregates alone. See [methodology and limitations](METHODOLOGY_AND_LIMITATIONS.md) for precise rules and run instructions.
