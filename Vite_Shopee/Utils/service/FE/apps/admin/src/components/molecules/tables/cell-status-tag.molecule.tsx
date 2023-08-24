import { brandingColors } from '@ss-fe-fw/constants';

export interface MCCellStatusTagProps {
  isActive: boolean;
}

export function MCCellStatusTag(props: MCCellStatusTagProps) {
  return (
    <>
    <span className={ props.isActive ? 'active-tag' : 'inactive-tag'}>
      { props.isActive ? 'Active' : 'Inactive' }
    </span>
    <style jsx>{`
      .active-tag {
        color: ${brandingColors['success-color']};
        border: 1px solid ${brandingColors['success-color']};
        background: #F6FFED;
        padding: 2px 8px;
      }
      .inactive-tag {
        color: ${brandingColors['inactive-color']};
        border: 1px solid ${brandingColors['inactive-border-color']};
        background: #F9FAFB;
        padding: 2px 8px;
      }
    `}</style>
    </>
  )
}

export default MCCellStatusTag
