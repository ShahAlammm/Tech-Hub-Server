import { QueryBuilder } from '../../builder/QueryBuilder';
import { ItemCategory } from '../ItemCategory/itemCategory.model';
import { UserSearchableFields } from '../User/user.constant';
import { User } from '../User/user.model';

export const SearchItemByUserQueryMaker = async (
  query: Record<string, unknown>
) => {
  if (query?.searchTerm) {
    const userQuery = new QueryBuilder(User.find(), query).search(
      UserSearchableFields
    );

    const users = await userQuery.modelQuery;

    if (users && users.length > 0) {
      const userIds = users.map((user) => user._id);

      query['user'] = { $in: userIds };
      /**
       * query['user'] = {
       * $in: [
       * ObjectId('5f7b3b3b4f3c7b0b3c7b0b3c'),
       * ObjectId('5f7b3b3b4f3c7b0b3c7b0b3c'),
       * ]
       */
      delete query.searchTerm;
      return query;
    }
  }
};

export const SearchItemByCategoryQueryMaker = async (
  query: Record<string, unknown>
) => {
  if (query?.category) {
    const category = await ItemCategory.findOne({
      name: query.category,
    }).select('_id');

    if (category) {
      query['category'] = category._id;
    }

    return query;
  }
  return query;
};
