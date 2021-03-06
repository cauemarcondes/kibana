/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { isFunction, transform, size, cloneDeep, get, defaults } from 'lodash';
import { createCustomFieldFormat } from './converters/custom';
import { ContentType, FieldFormatConvert, FieldFormatConvertFunction } from './types';

import {
  htmlContentTypeSetup,
  textContentTypeSetup,
  TEXT_CONTEXT_TYPE,
  HTML_CONTEXT_TYPE,
} from './content_types';

const DEFAULT_CONTEXT_TYPE = 'text';

export const isFieldFormatConvertFn = (convert: any): convert is FieldFormatConvertFunction =>
  isFunction(convert);

export abstract class FieldFormat {
  /**
   * @property {string} - Field Format Id
   * @static
   * @public
   */
  static id: string;
  /**
   * @property {string} -  Field Format Title
   * @static
   * @public
   */
  static title: string;

  /**
   * @property {string} - Field Format Type
   * @private
   */
  static fieldType: string | string[];

  /**
   * @property {FieldFormatConvert}
   * @private
   * have to remove the private because of
   * https://github.com/Microsoft/TypeScript/issues/17293
   */
  convertObject: FieldFormatConvert | undefined;

  /**
   * @property {Function} - ref to child class
   * @private
   */
  public type: any = this.constructor;

  constructor(public _params: any = {}) {}

  /**
   * Convert a raw value to a formatted string
   * @param  {any} value
   * @param  {string} [contentType=text] - optional content type, the only two contentTypes
   *                                currently supported are "html" and "text", which helps
   *                                formatters adjust to different contexts
   * @return {string} - the formatted string, which is assumed to be html, safe for
   *                    injecting into the DOM or a DOM attribute
   * @public
   */
  convert(value: any, contentType: ContentType = DEFAULT_CONTEXT_TYPE): string {
    const converter = this.getConverterFor(contentType);

    if (converter) {
      return converter.call(this, value);
    }

    return value;
  }

  /**
   * Get a convert function that is bound to a specific contentType
   * @param  {string} [contentType=text]
   * @return {function} - a bound converter function
   * @public
   */
  getConverterFor(
    contentType: ContentType = DEFAULT_CONTEXT_TYPE
  ): FieldFormatConvertFunction | null {
    if (!this.convertObject) {
      this.convertObject = FieldFormat.setupContentType(this, get(this, '_convert'));
    }

    return this.convertObject[contentType] || null;
  }

  /**
   * Get parameter defaults
   * @return {object} - parameter defaults
   * @public
   */
  getParamDefaults(): Record<string, any> {
    return {};
  }

  /**
   * Get the value of a param. This value may be a default value.
   *
   * @param  {string} name - the param name to fetch
   * @return {any}
   * @public
   */
  param(name: string): any {
    const val = get(this._params, name);

    if (val || val === false || val === 0) {
      // truthy, false, or 0 are fine
      // '', NaN, null, undefined, etc are not
      return val;
    }

    return get(this.getParamDefaults(), name);
  }

  /**
   * Get all of the params in a single object
   * @return {object}
   * @public
   */
  params(): Record<string, any> {
    return cloneDeep(defaults({}, this._params, this.getParamDefaults()));
  }

  /**
   * Serialize this format to a simple POJO, with only the params
   * that are not default
   *
   * @return {object}
   * @public
   */
  toJSON() {
    const id = get(this.type, 'id');
    const defaultsParams = this.getParamDefaults() || {};

    const params = transform(
      this._params,
      (uniqParams, val, param) => {
        if (param && val !== get(defaultsParams, param)) {
          uniqParams[param] = val;
        }
      },
      {}
    );

    return {
      id,
      params: size(params) ? params : undefined,
    };
  }

  static from(convertFn: FieldFormatConvertFunction) {
    return createCustomFieldFormat(convertFn);
  }

  /*
   * have to remove the private because of
   * https://github.com/Microsoft/TypeScript/issues/17293
   */
  static setupContentType(
    fieldFormat: IFieldFormat,
    convert: Partial<FieldFormatConvert> | FieldFormatConvertFunction = {}
  ): FieldFormatConvert {
    const convertObject = isFieldFormatConvertFn(convert)
      ? FieldFormat.toConvertObject(convert)
      : convert;

    return {
      [TEXT_CONTEXT_TYPE]: textContentTypeSetup(fieldFormat, convertObject),
      [HTML_CONTEXT_TYPE]: htmlContentTypeSetup(fieldFormat, convertObject),
    };
  }

  /*
   * have to remove the private because of
   * https://github.com/Microsoft/TypeScript/issues/17293
   */
  static toConvertObject(convert: FieldFormatConvertFunction): Partial<FieldFormatConvert> {
    if (isFieldFormatConvertFn(convert)) {
      return {
        [TEXT_CONTEXT_TYPE]: convert,
      };
    }
    return convert;
  }
}

export type IFieldFormat = PublicMethodsOf<FieldFormat>;
