import { DailyQuote } from '@/types/daily';
import axios from 'axios';

export default class DailyService {
  QUOTE_API_URL = 'https://zenquotes.io/api/random';

  public async getRandomDailyQuote(): Promise<DailyQuote> {
    const { data } = await axios.get(this.QUOTE_API_URL);
    return {
      quote: data[0]?.q,
      author: data[0]?.a,
    };
  }
}
