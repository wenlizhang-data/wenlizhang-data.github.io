# Sample structure and concentration


## Media composition — scoped dataset

| media | records | share | videos | median_records_per_video | q1 | q3 |
| --- | --- | --- | --- | --- | --- | --- |
| AL | 3265 | 9.65% | 20 | 99.5 | 35.5 | 253.75 |
| BBC | 8020 | 23.69% | 19 | 479.0 | 176.0 | 621.0 |
| CGTN | 860 | 2.54% | 18 | 6.5 | 3.0 | 8.75 |
| CNN | 13168 | 38.90% | 20 | 657.5 | 466.25 | 819.75 |
| DW | 2934 | 8.67% | 20 | 140.5 | 85.25 | 186.75 |
| NBC | 3549 | 10.48% | 20 | 64.5 | 44.75 | 222.0 |
| NYT | 2055 | 6.07% | 7 | 102.0 | 53.5 | 401.0 |

The two largest source contributions (CNN and BBC) together account for 62.59% of scoped records. Equal counts of captured videos do not imply equal representation in record-weighted summaries.

## Video concentration — scoped dataset

- Videos: 124; records: 33,851.
- Minimum / Q1 / median / Q3 / maximum: 1 / 35.75 / 148.5 / 456.25 / 1,096 records per video.
- Mean: 272.99 records per video.
- Top 5: 5,079 records / 33,851 = 15.00%; these are 4.03% of scoped videos.
- Top 10: 9,244 records / 33,851 = 27.31%; these are 8.06% of scoped videos.
- CGTN: its largest video contains 753 / 860 records (87.56%); its median is 6.5.

Quartiles use linear interpolation over one record count per video. The ranked curve uses every scoped video, not a selected subset; ties do not affect top-N record totals. These are retained-capture counts, not complete engagement or audience size.

## Overall weighting comparison — English analytical sample

| sentiment | record_weighted_share | video_equal_weight_share | difference_pp | retaining_capture_repeats_share |
| --- | --- | --- | --- | --- |
| Negative | 15.99% | 16.70% | +0.71 | 15.94% |
| Neutral | 52.87% | 52.81% | -0.07 | 52.88% |
| Positive | 31.13% | 30.49% | -0.64 | 31.17% |

Differences are equal-video minus record-weighted, in percentage points. Record-weighted means each distinct analytical record counts equally. Equal-video weighting averages category proportions across all 123 eligible videos, not across seven source averages. Sources with more eligible videos still receive more total weight. Retained-capture weighting uses `capture_occurrences`.

## Source-level differences, percentage points

| media | Negative | Neutral | Positive |
| --- | --- | --- | --- |
| AL | -1.12 | -1.08 | +2.20 |
| BBC | -1.17 | +0.32 | +0.85 |
| CGTN | +3.24 | -0.92 | -2.31 |
| CNN | -0.01 | +1.52 | -1.51 |
| DW | +0.44 | -0.39 | -0.05 |
| NBC | -1.50 | -2.30 | +3.81 |
| NYT | +0.03 | +3.32 | -3.35 |

Every overall category changes by less than one percentage point. The largest source/category change is NBC Positive: 29.60% → 33.40%, or +3.81 pp. NYT Positive changes from 38.18% to 34.83%. NBC and CNN switch their relative Positive-share order under the two weighting schemes; this is a reason not to rank sources.

The broad overall ordering (Neutral, Positive, Negative) remains, and Neutral remains the largest category within every source under both approaches. This does not make the sample representative or validate sentiment labels. Source-level numeric comparisons remain sensitive to video composition.

Equal-video weighting is a sensitivity view, not a preferred truth. 15 eligible videos contain fewer than 10 English analytical records; the minimum is 1. Tiny samples receive the same video weight as large samples. No confidence interval, population effect or causal interpretation is asserted.
