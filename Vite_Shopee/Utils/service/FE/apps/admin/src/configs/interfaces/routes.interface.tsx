import React from 'react'

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface ITableColumnItem {
  title: string;
  key: string;
  fieldName?: string; // For Relations
  render?: any;
  ellipsis?: boolean;
  align?: string;
  className?: string;
  colSpan?: number;
  editable?: boolean;
  responsive?: Breakpoint[];
  sorter?: boolean;
  type?: string;
  // If column is virtual field, eg: fullName is virtual field is combined from firstName + lastName
  // When sort, we need specify real column to sort. Unless the sort will be error
  realColumnSorter?: string;
  linkToDetail?: string;
}

export interface IFilterRelationItem {
  name: string;
  field: string;
  idKey: string;
}

export interface IFilterField {
  key: string;
  label?: string;
  component?: {
    element: any;
    value?: any;
    can?: string;
  };
}

export interface ItemRoute {
  key: string;
  title?: string;
  link: string;
  apiEndpoint?: string;
  isDisplayBreadcrumb: boolean;
  breadcrumb: ItemBreadcrumb[];
  ui?: {
    // List for List Resource config
    list?: {
      topControls?: {
        breadcrumbTopRight?: {
          isDisplay: boolean,
          component: any[]
        },
        top?: {
          isDisplay: boolean,
          component?: React.FunctionComponent
        },
        left?: {
          isDisplay: boolean,
          beforeExtraComponent?: React.FunctionComponent,
          afterExtraComponent?: React.FunctionComponent
        },
        right?: {
          isDisplay: boolean
          beforeExtraComponent?: React.FunctionComponent,
          afterExtraComponent?: React.FunctionComponent
        }
      },
      query?: {
        include?: any,
        orderBy?: any,
        where?: any
      },
      search?: {
        fields?: string[],
        customFormatFields?: {
          format: any;
        },
      },
      filters?: {
        fields?: IFilterField[],
        relations?: IFilterRelationItem[]
      },
      table?: {
        isDisplay: boolean,
        columns?: ITableColumnItem[],
        transform?: any
      }
    },
    // Detail, Edit, Create config
    twoColumns?: {
      // Check Permission of page
      can?: [
        {
          action: string,
          resource: string
        }
      ],
      left?: {
        isDisplay: boolean,
        title?: string,
        backLink?: string,
        extraHeaderComponent?: React.FunctionComponent[],
        component?: React.FunctionComponent,
        footerComponent?: React.FunctionComponent
      },
      main?: {
        isDisplay: boolean,
        components?: TwoColumnsMainComponent[],
      }
    }
  }
}

export interface TwoColumnsMainComponent {
  key: string;
  title: string;
  // Check Permission of component
  can?: {
    action: string,
    resource: string,
  },
  component: React.FunctionComponent;
}

export interface ItemBreadcrumb {
  path: string;
  breadcrumbName: string;
}
