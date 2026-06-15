import { CategoryCard } from "@/components/ui/CategoryCard"
import { AuditScores, AuditIssue } from "@/lib/types"

interface CategoryGridProps {
  scores: AuditScores
  issues: AuditIssue[]
}

export function CategoryGrid({ scores, issues }: CategoryGridProps) {
  const getIssueCount = (category: AuditIssue['category']) => 
    issues.filter(i => i.category === category).length

  return (
    <div className="grid grid-cols-2 gap-[1px] bg-border border-y border-border">
      <CategoryCard 
        label="Contrast" 
        score={scores.contrast} 
        issueCount={getIssueCount('contrast')} 
      />
      <CategoryCard 
        label="Alt text" 
        score={scores.altText} 
        issueCount={getIssueCount('altText')} 
      />
      <CategoryCard 
        label="Typography" 
        score={scores.typography} 
        issueCount={getIssueCount('typography')} 
      />
      <CategoryCard 
        label="Spacing" 
        score={scores.spacing} 
        issueCount={getIssueCount('spacing')} 
      />
    </div>
  )
}
