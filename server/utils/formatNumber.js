// Format  count in M and K
const formatNumber = (num) => {
	if (num >= 1000000) {
		return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
	} else if (num >= 1000) {
		return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
	} else {
		return num.toString();
	}
};

export default formatNumber;
