describe('Kadanes Algorithm', () => {
    function kadanes(arr) {
        let maxSum = arr[0];
        let currentSum = arr[0];
        for (let i = 1; i < arr.length; i++) {
            currentSum = Math.max(arr[i], currentSum + arr[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
    it('should return the maximum sum of a subarray', () => {
        const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
        const result = kadanes(arr);
        expect(result).toBe(6);
    });
});