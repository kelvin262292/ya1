export async function POST(req: Request) {
  const data = await generateExportData();
  return new Response(data, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="export.csv"'
    }
  });
}