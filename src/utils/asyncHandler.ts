
/**
 * @param  {Promise<T>} promise
 * @returns Promise
 */
export async function asyncHandler<T = any>(promise: Promise<T>): Promise<[T | null, Object | null]> {
    try {
        const response = await promise
        return [response, null]
    } catch (error) {
        console.error(error)

        return [null, error]
    }
}


export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);


  