export default function numberWithCommas(number) {
	return number.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,');
}
