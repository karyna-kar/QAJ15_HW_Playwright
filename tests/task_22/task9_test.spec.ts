import { expect, test } from '@playwright/test';

test.describe('Test herokuapp/tables page', async () => {
  test('Verify table', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    const title = await page.evaluate(() => document.title);
    expect(title).toEqual('The Internet');

    //function
    const script = async (tableNumber: number) => {
      if (tableNumber !== 1 && tableNumber !== 2) {
        throw new Error('tableNumber should be 1 or 2');
      }

      const rows = Array.from(document.querySelectorAll(`#table${tableNumber} tbody tr`));

      const tableData = rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
          'Last Name': cells[0].textContent,
          'First Name': cells[1].textContent,
          Email: cells[2].textContent,
          Due: cells[3].textContent,
          'Web Site': cells[4].textContent,
          Action: Array.from(cells[5].querySelectorAll('a'))
            .map(a => a.textContent.trim())
            .join(' ')
        };
      });
      return tableData;
    };

    const expectedTableData = [
      {
        'Last Name': 'Smith',
        'First Name': 'John',
        Email: 'jsmith@gmail.com',
        Due: '$50.00',
        'Web Site': 'http://www.jsmith.com',
        Action: 'edit delete'
      },
      {
        'Last Name': 'Bach',
        'First Name': 'Frank',
        Email: 'fbach@yahoo.com',
        Due: '$51.00',
        'Web Site': 'http://www.frank.com',
        Action: 'edit delete'
      },
      {
        'Last Name': 'Doe',
        'First Name': 'Jason',
        Email: 'jdoe@hotmail.com',
        Due: '$100.00',
        'Web Site': 'http://www.jdoe.com',
        Action: 'edit delete'
      },
      {
        'Last Name': 'Conway',
        'First Name': 'Tim',
        Email: 'tconway@earthlink.net',
        Due: '$50.00',
        'Web Site': 'http://www.timconway.com',
        Action: 'edit delete'
      }
    ];

    const tableData = await page.evaluate(script, 1);
    expect(tableData).toMatchObject(expectedTableData);
  });
});
