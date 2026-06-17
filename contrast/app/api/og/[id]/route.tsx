import { ImageResponse } from '@vercel/og';
import { createAdminClient } from '@/lib/supabase';

export const runtime = 'edge';

function getGradeInfo(score: number) {
  if (score >= 85) return { grade: 'Excellent', color: '#1A7A42' };
  if (score >= 70) return { grade: 'Good', color: '#8A5E00' };
  if (score >= 50) return { grade: 'Needs work', color: '#CC4400' };
  return { grade: 'Critical', color: '#B31B1B' };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    let url = 'contrast.anubhxv.design';
    let score = 0;
    
    // Fetch result from Supabase
    try {
      const supabase = createAdminClient();
      const { data } = await supabase
        .from('audits')
        .select('url, overall_score')
        .eq('id', id)
        .single();
        
      if (data && data.url && data.overall_score !== undefined) {
        url = new URL(data.url).hostname;
        score = data.overall_score;
      }
    } catch (e) {
      console.warn('Failed to fetch from Supabase for OG image', e);
    }

    const { grade, color } = getGradeInfo(score);

    const fontData = await fetch(
      new URL('https://fonts.gstatic.com/s/instrumentserif/v1/NaPPcN3hM_cm33FMuNpRZ1qUMhno.woff')
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(255,255,255,0) 0%, rgba(255,255,255,.9) 55%, #fff 100%), linear-gradient(#E2E0D8 1px, transparent 1px), linear-gradient(90deg, #E2E0D8 1px, transparent 1px)',
            backgroundSize: '100% 100%, 48px 48px, 48px 48px',
            padding: '80px',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div
              style={{
                fontSize: 48,
                fontStyle: 'italic',
                fontFamily: '"Instrument Serif"',
                color: '#16150F',
                marginBottom: 'auto',
              }}
            >
              Contrast
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '32px' }}>
                <div
                  style={{
                    fontSize: 180,
                    fontWeight: 400,
                    lineHeight: 0.9,
                    color: color,
                    fontFamily: '"Instrument Serif"',
                  }}
                >
                  {score}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '24px' }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: color,
                      fontFamily: 'monospace',
                    }}
                  >
                    {grade}
                  </div>
                  <div style={{ fontSize: 24, color: '#8A8880', marginTop: '8px' }}>
                    {url}
                  </div>
                </div>
              </div>
              
              <div
                style={{
                  marginTop: '80px',
                  fontSize: 32,
                  color: '#16150F',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                }}
              >
                Find the design debt your team stopped seeing.
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Instrument Serif',
            data: fontData,
            style: 'italic',
          },
        ],
      }
    );
  } catch (e: unknown) {
    console.error(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
