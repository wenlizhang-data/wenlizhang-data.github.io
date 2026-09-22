/* Evidence inspection only. No API calls, simulated generation or changed calculations. */
const sourceRows = [...document.querySelectorAll('.source-row')];
const sourceReadout = document.getElementById('source-readout');
function inspectSource(row) {
  sourceRows.forEach(item => item.setAttribute('aria-pressed', String(item === row)));
  sourceReadout.textContent = row.dataset.detail;
}
sourceRows.forEach(row => {
  row.addEventListener('pointerenter', () => inspectSource(row));
  row.addEventListener('focus', () => inspectSource(row));
  row.addEventListener('click', () => inspectSource(row));
});
const patterns = {
  location: ['Hong Kong, neighbourhoods and an MTR-station location.', 'The prompt references connect food recommendations to identifiable places.', 'Use a relevant location when it is supplied in the input; do not invent one.'],
  emotion: ['Enthusiastic reactions to food and dining experiences.', 'Selected headline references use excitement and personal reactions. The archived feedback also asks for relevant, concise wording.', 'Vary the emotional framing while keeping it relevant to the supplied content.'],
  practical: ['A 48-hour itinerary, a budget and food-stop details.', 'Retained references include a short-trip scenario, price information and addresses. These are supplied details, not evidence of a performance effect.', 'Select a useful scenario or practical detail from the input; never add an unsupported price.']
};
document.querySelectorAll('[data-pattern]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-pattern]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const [observed, evidence, rule] = patterns[button.dataset.pattern];
    document.getElementById('pattern-observed').textContent = observed;
    document.getElementById('pattern-evidence').textContent = evidence;
    document.getElementById('pattern-rule').textContent = rule;
  });
});
